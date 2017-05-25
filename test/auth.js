require('node-env-file')( __dirname + '/../.env' )

process.on( 'unhandledRejection' , r => console.log( r ) )

Object.create( Object.assign( { }, require('./__proto__'), {

    email: 'email@email.com',

    pw: 'okay',

    runTests() {

        this.Mocha.before( () => this.createServer() )
        
        this.Mocha.after( () => this.closeServer() )

        this.Mocha.beforeEach( () =>
            this.Auth.createPassword( this.pw )
            .then( pw => this.Resource.create( { count: 1, name: 'person', bootstrap: () => ( { password: pw, email: this.email } ) } ) )
            .then( ( [ person ] ) => Promise.resolve( this.person = person ) )
         )
        
        this.Mocha.afterEach( () => this.Postgres.truncate() )

        this.Mocha.describe( `POST /auth`, () => {

            this.Mocha.it( 'Returns 401 when given invalid credentials', () => {
                return this.Request( { path: `/auth`, method: 'POST', body: { email: 'NOT_THE_EMAIL', password: this.pw } } )
                .then( ( [ body, response ] ) => {
                    this.Chai.assert.equal( response.statusCode, 401 )
                    return Promise.resolve()
                } )
            } )

            this.Mocha.it( 'Returns 200, validated Set-Cookie header when given valid credentials', () =>
                this.Request( { path: `/auth`, method: 'POST', body: { email: this.email, password: this.pw } } )
                .then( ( [ body, response ] ) => {
                    this.Chai.assert.equal( response.statusCode, 200 )
                    this.Chai.assert.isObject( body )
                    this.Chai.assert.isDefined( response.headers[ 'set-cookie' ] )
                 
                    return this.Jwt.parseToken( this.Auth.parseCookies( response.headers[ 'set-cookie' ][0] ) )
                    .then( user => {
                        this.Chai.assert.isUndefined( user.password )
                        this.Chai.assert.equal( user.email, this.email )
                        this.Chai.assert.isArray( user.roles )
                        this.Chai.assert.equal( user.roles.length, 0 )
                        return Promise.resolve()
                    } )
                } )
            )

            this.Mocha.it( 'Returns 200, includes user roles in cookie', () =>
                this.Postgres.insert( 'role', { name: 'admin' } )
                .then( ( [ { id } ] ) => this.Postgres.insert( 'membership', { roleId: id, personId: this.person.id } ) )
                .then( () => this.Request( { path: `/auth`, method: 'POST', body: { email: this.email, password: this.pw } } ) )
                .then( ( [ body, response ] ) => {
                    this.Chai.assert.equal( response.statusCode, 200 )
                    this.Chai.assert.isObject( body )
                    this.Chai.assert.isDefined( response.headers[ 'set-cookie' ] )
                 
                    return this.Jwt.parseToken( this.Auth.parseCookies( response.headers[ 'set-cookie' ][0] ) )
                    .then( user => {
                        this.Chai.assert.isUndefined( user.password )
                        this.Chai.assert.equal( user.email, this.email )
                        this.Chai.assert.isArray( user.roles )
                        this.Chai.assert.equal( user.roles.length, 1 )
                        this.Chai.assert.equal( user.roles[0], 'admin' )

                        return Promise.resolve()
                    } )
                 } )
            )
            
        } )
    }

} ) ).runTests()
