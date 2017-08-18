require('node-env-file')( __dirname + '/../.env' )

process.on( 'unhandledRejection' , r => console.log( r ) )

Object.create( Object.assign( { }, require('./__proto__'), {

    Byop: require('../models/Byop'),
    
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
    
    Exec: require('child_process').exec,

    createAdmin() {
        return this.Resource.create( { count: 1, name: 'person' } )
        .then( ( [ person ] ) => {
            this.person = person
            return this.Jwt.makeToken( Object.assign( this.person, { roles: [ 'admin' ] } ) )
            .then( token => Promise.resolve( this.token = token ) )
        } )
    },

    getPostModel( obj ) {
        const model = Object.create( this.Model, { resource: { value: 'byop' }, data: { value: obj } } )
        return model.create()
        .then( () => {
            this.Byop.generatedAttrs.forEach( attr => model.data[ attr ] = undefined )
            return Promise.resolve( model )
        } )
    },

    runTests() {

        this.Mocha.before( () =>
            this.P( this.Exec, [ `psql -d ${process.env.PGDATABASE} -f ./sql/bootstrap/20170523.sql` ], this )
            .then( () => this.createServer() )
        )
        
        this.Mocha.after( () =>
            this.closeServer().then( () => this.Postgres.truncate() )
        )

        //this.Mocha.beforeEach( () => this.P( this.Exec, [ `psql -d hazy -f ./sql/bootstrap/20170523.sql` ], this ) )
        
        this.Mocha.afterEach( () => this.Postgres.truncate( [ 'division' ] ) )

        this.Mocha.describe( `POST /byop`, () => {

            [ 'ccName', 'ccNo', 'ccYear', 'ccMonth', 'cvc' ].forEach( attr =>
                this.Mocha.it( `Returns 500 when ${attr} is not provided`, () =>
                    this.getPostModel( { email: 'topherbaron@gmail.com', total: 123.5 } )
                    .then( model => {
                        const cc = Object.assign( {}, this.CC.valid, { [attr]: undefined } )
                        return this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, cc, model.data ) } )
                    } )
                    .then( ( [ body, response ] ) => {
                        this.Chai.assert.equal( response.statusCode, 500 )
                        this.Chai.assert.isObject( body )
                        this.Chai.assert.equal( body.message, `Credit card information is required.` )
                        return this.Postgres.query( 'SELECT * FROM byop' )
                        .then( rows => {
                            this.Chai.assert.equal( rows.length, 0 )
                            return Promise.resolve()
                        } )
                    } )
                )
            )

            this.Byop.requiredAttrs.forEach( attr =>
                this.Mocha.it( `Returns 500 when ${attr} not provided`, () =>
                    this.getPostModel( { email: 'topherbaron@gmail.com', total: 123.5 } )
                    .then( model => {
                        model.data[ attr ] = undefined
                        return this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, this.CC.valid, model.data ) } )
                    } )
                    .then( ( [ body, response ] ) => {
                        this.Chai.assert.equal( response.statusCode, 500 )
                        this.Chai.assert.isObject( body )
                        this.Chai.assert.equal( body.message, `${attr} required.` )
                        return this.Postgres.query( 'SELECT * FROM byop' )
                        .then( rows => {
                            this.Chai.assert.equal( rows.length, 0 )
                            return Promise.resolve()
                        } )
                    } )
                )
            )
            
            this.Byop.generatedAttrs.forEach( attr =>
                this.Mocha.it( `Returns 500 when ${attr} is provided`, () =>
                    this.getPostModel( { email: 'topherbaron@gmail.com', total: 123.50, ace1: false, ace2: false, belmontDonation: 0 } )
                    .then( model => {
                        model.data[ attr ] = 'something'
                        return this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, this.CC.valid, model.data ) } )
                    } )
                    .then( ( [ body, response ] ) => {
                        this.Chai.assert.equal( response.statusCode, 500 )
                        this.Chai.assert.isObject( body )
                        this.Chai.assert.equal( body.message, `${attr} disallowed.` )
                        return this.Postgres.query( 'SELECT * FROM byop' )
                        .then( rows => {
                            this.Chai.assert.equal( rows.length, 0 )
                            return Promise.resolve()
                        } )
                    } )
                )
            )

            this.Mocha.it( `Returns 500 when total is less than $123.50`, () =>
                this.getPostModel( { email: 'topherbaron@gmail.com', total: 122.5 } )
                .then( model => this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, this.CC.valid, model.data ) } ) )
                .then( ( [ body, response ] ) => {
                    this.Chai.assert.equal( response.statusCode, 500 )
                    this.Chai.assert.isObject( body )
                    this.Chai.assert.equal( body.message, `Invalid Total.` )
                    return this.Postgres.query( 'SELECT * FROM byop' )
                    .then( rows => {
                        this.Chai.assert.equal( rows.length, 0 )
                        return Promise.resolve()
                    } )
                } )
            )

            this.Mocha.it( `Returns 500 when total is invalid`, () =>
                this.getPostModel( { email: 'topherbaron@gmail.com', total: 150, ace1: true, ace2: true, belmontDonation: 500 } ) 
                .then( model => this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, this.CC.valid, model.data ) } ) )
                .then( ( [ body, response ] ) => {
                    this.Chai.assert.equal( response.statusCode, 500 )
                    this.Chai.assert.isObject( body )
                    this.Chai.assert.equal( body.message, `Doesn't add up.` )
                    return this.Postgres.query( 'SELECT * FROM byop' )
                    .then( rows => {
                        this.Chai.assert.equal( rows.length, 0 )
                        return Promise.resolve()
                    } )
                } )
            )

            this.Mocha.it( `Returns 200 creates byop row, stripe charge when shit is all there`, () =>
                this.getPostModel( { email: 'topherbaron@gmail.com', total: 124.50, ace1: false, ace2: false, belmontDonation: 1 } )
                .then( model => 
                    this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, this.CC.valid, model.data ) } )
                    .then( ( [ body, response ] ) => {
                        this.Chai.assert.equal( response.statusCode, 200 )
                        this.Chai.assert.isObject( body )
                        this.Chai.assert.equal( body.message, `Great Job!` )
                        return this.Postgres.query( 'SELECT * FROM byop' )
                        .then( rows => {
                            this.Chai.assert.equal( rows.length, 1 )

                            const row = rows[0]

                            this.Byop.requiredAttrs.forEach( attr => this.Chai.assert.equal( row[ attr ], model.data[ attr ] ) )
                            this.Chai.assert.equal( row.waitList, false )
                            this.Chai.assert.equal( row.hasPaid, true )
                            this.Chai.assert.isString( row.stripeChargeId )
                            this.Chai.assert.isTrue( row.stripeChargeId.length > 0 )
                            this.Chai.assert.equal( row.belmontDonation, 1 )
                            
                            return Promise.resolve()
                        } )
                    } )
                )
            )

            this.Mocha.it( `Returns 200, 'All slots have filled.  You have been added to the wait list.' when shit is all there, but there are already 108 teams signed up for saturday`, () => {
                const recId = this.Postgres.divisions.store.name[ 'rec' ].id;
                return this.getPostModel( { email: 'topherbaron@gmail.com', total: 124.50, ace1: false, ace2: false, belmontDonation: 1, divisionId: recId } )
                .then( model =>
                    Promise.all( this.getIntRange( 108 ).map( () => this.Postgres.insert( 'byop', Object.assign( {}, model.data, { waitList: false, stripeChargeId: 'someshit', hasPaid: true } ) ) ) )
                    .then( () => this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, this.CC.valid, model.data ) } ) )
                    .then( ( [ body, response ] ) => {
                        this.Chai.assert.equal( response.statusCode, 200 )
                        this.Chai.assert.isObject( body )
                        this.Chai.assert.equal( body.message, `All slots have filled.  You have been added to the wait list.` )
                        return this.Postgres.query( 'SELECT * FROM byop WHERE "waitList" = true' )
                        .then( rows => {
                            this.Chai.assert.equal( rows.length, 1 )

                            const row = rows[0]

                            this.Byop.requiredAttrs.forEach( attr => this.Chai.assert.equal( row[ attr ], model.data[ attr ] ) )
                            this.Chai.assert.equal( row.waitList, true )
                            this.Chai.assert.equal( row.hasPaid, false )
                            this.Chai.assert.isNull( row.stripeChargeId )
                            this.Chai.assert.equal( row.belmontDonation, 1 )
                            
                            return Promise.resolve()
                        } )
                    } )
                )
            } )

            this.Mocha.it( `Returns 200, 'All slots have filled.  You have been added to the wait list.' when shit is all there, but there are already 108 teams signed up for sunday`, () => {
                const recId = this.Postgres.divisions.store.name[ 'opn' ].id
                return this.getPostModel( { email: 'topherbaron@gmail.com', total: 124.50, ace1: false, ace2: false, belmontDonation: 1, divisionId: recId } )
                .then( model =>
                    Promise.all( this.getIntRange( 108 ).map( () => this.Postgres.insert( 'byop', Object.assign( {}, model.data, { waitList: false, stripeChargeId: 'yaya', hasPaid: true } ) ) ) )
                    .then( () => this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, this.CC.valid, model.data ) } ) )
                    .then( ( [ body, response ] ) => {
                        this.Chai.assert.equal( response.statusCode, 200 )
                        this.Chai.assert.isObject( body )
                        this.Chai.assert.equal( body.message, `All slots have filled.  You have been added to the wait list.` )
                        return this.Postgres.query( 'SELECT * FROM byop WHERE "waitList" = true' )
                        .then( rows => {
                            this.Chai.assert.equal( rows.length, 1 )

                            const row = rows[0]

                            this.Byop.requiredAttrs.forEach( attr => this.Chai.assert.equal( row[ attr ], model.data[ attr ] ) )
                            this.Chai.assert.equal( row.waitList, true )
                            this.Chai.assert.equal( row.hasPaid, false )
                            this.Chai.assert.isNull( row.stripeChargeId )
                            this.Chai.assert.equal( row.belmontDonation, 1 )
                            
                            return Promise.resolve()
                        } )
                    } )
                )
            } )

            this.Mocha.it( `Returns 200, 'You have been added to the wait list.' when shit is all there except CC info, and there are already 108 teams signed up for sunday`, () => {
                const recId = this.Postgres.divisions.store.name[ 'opn' ].id
                return this.getPostModel( { email: 'topherbaron@gmail.com', total: 124.50, ace1: false, ace2: false, belmontDonation: 1, divisionId: recId } )
                .then( model =>
                    Promise.all( this.getIntRange( 108 ).map( () => this.Postgres.insert( 'byop', Object.assign( {}, model.data, { waitList: false, stripeChargeId: 'yeah', hasPaid: true } ) ) ) )
                    .then( () => this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, model.data ) } ) )
                    .then( ( [ body, response ] ) => {
                        this.Chai.assert.equal( response.statusCode, 200 )
                        this.Chai.assert.isObject( body )
                        this.Chai.assert.equal( body.message, `You have been added to the wait list.` )
                        return this.Postgres.query( 'SELECT * FROM byop WHERE "waitList" = true' )
                        .then( rows => {
                            this.Chai.assert.equal( rows.length, 1 )

                            const row = rows[0]

                            this.Byop.requiredAttrs.forEach( attr => this.Chai.assert.equal( row[ attr ], model.data[ attr ] ) )
                            this.Chai.assert.equal( row.waitList, true )
                            this.Chai.assert.equal( row.hasPaid, false )
                            this.Chai.assert.isNull( row.stripeChargeId )
                            this.Chai.assert.equal( row.belmontDonation, 1 )
                            
                            return Promise.resolve()
                        } )
                    } )
                )
            } )

            this.Mocha.it( `Returns 200, 'You have been added to the wait list.' when shit is all there except CC info, and there are already 108 teams signed up for sunday`, () => {
                const recId = this.Postgres.divisions.store.name[ 'opn' ].id
                return this.getPostModel( { email: 'topherbaron@gmail.com', total: 124.50, ace1: false, ace2: false, belmontDonation: 1, divisionId: recId } )
                .then( model =>
                    Promise.all( this.getIntRange( 108 ).map( () => this.Postgres.insert( 'byop', Object.assign( {}, model.data, { waitList: false, stripeChargeId: 'yaya', hasPaid: true } ) ) ) )
                    .then( () => this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, model.data ) } ) )
                    .then( ( [ body, response ] ) => {
                        this.Chai.assert.equal( response.statusCode, 200 )
                        this.Chai.assert.isObject( body )
                        this.Chai.assert.equal( body.message, `You have been added to the wait list.` )
                        return this.Postgres.query( 'SELECT * FROM byop WHERE "waitList" = true' )
                        .then( rows => {
                            this.Chai.assert.equal( rows.length, 1 )

                            const row = rows[0]

                            this.Byop.requiredAttrs.forEach( attr => this.Chai.assert.equal( row[ attr ], model.data[ attr ] ) )
                            this.Chai.assert.equal( row.waitList, true )
                            this.Chai.assert.equal( row.hasPaid, false )
                            this.Chai.assert.isNull( row.stripeChargeId )
                            this.Chai.assert.equal( row.belmontDonation, 1 )
                            
                            return Promise.resolve()
                        } )
                    } )
                )
            } )

            this.Mocha.it( `Returns 500, 'Error processing payment.  Please try again.' when shit is all there except CC info is invalid`, () =>
                this.getPostModel( { email: 'topherbaron@gmail.com', total: 124.50, ace1: false, ace2: false, belmontDonation: 1 } )
                .then( model => this.Request( { path: `/byop`, method: 'POST', body: Object.assign( {}, this.CC.invalid, model.data ) } ) )
                .then( ( [ body, response ] ) => {
                    this.Chai.assert.equal( response.statusCode, 500 )
                    this.Chai.assert.isObject( body )
                    this.Chai.assert.equal( body.message, 'Error processing payment.  Please try again.' )
                    return this.Postgres.query( 'SELECT * FROM byop' )
                    .then( rows => {
                        this.Chai.assert.equal( rows.length, 0 )
                        return Promise.resolve()
                    } )
                } )
            )
        } )
        
        this.Mocha.describe( `PATCH /byop`, () => {
            this.Mocha.it( `Returns 404`, () =>
                this.Request( { path: `/byop`, method: 'PATCH', body: { } } )
                .then( ( [ body, response ] ) => {
                    this.Chai.assert.equal( response.statusCode, 404 )
                    this.Chai.assert.isObject( body )
                    this.Chai.assert.equal( Object.keys( body ).length, 0 )
                    return Promise.resolve()
                } )
            )
        } )

        this.Mocha.describe( `DELETE /byop`, () => {
            this.Mocha.it( `Returns 404`, () =>
                this.Request( { path: `/byop`, method: 'DELETE' } )
                .then( ( [ body, response ] ) => {
                    this.Chai.assert.equal( response.statusCode, 404 )
                    this.Chai.assert.isObject( body )
                    this.Chai.assert.equal( Object.keys( body ).length, 0 )
                    return Promise.resolve()
                } )
            )
        } )

        this.Mocha.describe( `PUT /byop`, () => {
            this.Mocha.it( `Returns 404`, () =>
                this.Request( { path: `/byop`, method: 'PUT', body: { } } )
                .then( ( [ body, response ] ) => {
                    this.Chai.assert.equal( response.statusCode, 404 )
                    this.Chai.assert.isObject( body )
                    this.Chai.assert.equal( Object.keys( body ).length, 0 )
                    return Promise.resolve()
                } )
            )
        } )
       
    }

} ) ).runTests()
