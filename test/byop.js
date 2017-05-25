require('node-env-file')( __dirname + '/../.env' )

process.on( 'unhandledRejection' , r => console.log( r ) )

Object.create( Object.assign( { }, require('./__proto__'), {
    
    Exec: require('child_process').exec,

    CC: {
        valid: {
            ccNo: '4242424242424242',
            ccName: 'CBag',
            ccYear: '2019',
            ccMonth: '01',
            cvc: 111
        },
        invalid: {
            ccNo: '4242424242424242',
            ccName: 'CBag',
            ccYear: '2016',
            ccMonth: '01',
            cvc: 111
        }
    },

    createAdmin() {
        return this.Resource.create( { count: 1, name: 'person' } )
        .then( ( [ person ] ) => {
            this.person = person
            return this.Jwt.makeToken( this.person )
            .then( token => Promise.resolve( this.token = token ) )
        } )
        .then( () => this.Postgres.insert( 'role', { name: 'admin' } )
        .then( ( [ { id } ] ) => this.Postgres.insert( 'membership', { roleId: id, personId: this.person.id } ) )
    },

    runTests() {

        this.Mocha.before( () => this.createServer() )
        
        this.Mocha.after( () => this.closeServer() )

        this.Mocha.beforeEach( () => this.P( this.Exec, this, [ `psql -d twinkle -f ./sql/bootstrap/20170523.sql` ] ) )
        
        this.Mocha.afterEach( () => this.Postgres.truncate() )

        this.Mocha.describe( `POST /byop`, () => {

            this.Postgres.tables.byop.colums.filter( column => ! [ 'waitList', 'hasPaid', 'stripeChargeId' ].includes( column.name ) )
            .then( requiredAttr =>
                this.Mocha.it( `Returns 500 when ${requiredAttr} not provided`, () =>
                    this.Resource.create( { name: 'byop', bootstrap: ( { [ requiredAttr ]: undefined } ) } )
                    .then( ( [ byopResource ] ) => this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, this.CC.valid, byopResource )  } ) )
                    .then( ( [ body, response ] ) => {
                        this.Chai.assert.equal( response.statusCode, 500 )
                        return Promise.resolve()
                    } )
                )
            )
        } )
    }

} ) ).runTests()
