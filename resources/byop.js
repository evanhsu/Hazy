module.exports = Object.assign( { }, require('./__proto__'), {

    Byop: require('../models/Byop'),

    Stripe: require('./lib/Stripe'),

    DELETE() { this.respond( { body: { }, code: 404 } ); return Promise.resolve() },

    GET() {
        return this.qs.length
            ? this.getUser()
              .then( () => this.user.roles.includes('superuser') ? this.apply( 'GET', false ) : this.badRequest() )
            : this.Postgres.query( `SELECT "divisionId", name1, name2 FROM byop WHERE "waitList" = false ORDER BY created` )
              .then( results => this.respond( { body: results } ) )
    },

    PATCH() { this.respond( { body: { }, code: 404 } ); return Promise.resolve() },
    
    PUT() { this.respond( { body: { }, code: 404 } ); return Promise.resolve() },

    POST() {
        return this.getUser()
        .then( () => this.slurpBody() )
        .then( () => this.validate() )
        .then( () => this.Postgres.insert( 'byop', this.omit( this.body, [ 'ccName', 'ccNo', 'ccMonth', 'ccYear', 'cvc' ] ) ) )
        .then( ( [ { id } ] ) =>
            this.hasCCInfo && (!this.body.waitList)
                ? this.pay( id )
                : this.user.roles.includes('admin') && (!this.body.waitList) && this.body.paidCash
                    ? this.respond( { body: { message: 'Great Job!' } } )
                    : this.nonPayingResponse()
        )
    },

    checkAvailability( division ) {
        return Reflect.apply( this.Common.spotsTaken, this, [ division ] )
        .then( count => Promise.resolve( this.body.waitList = Boolean( count >= 108 ) ) )
    },

    nonPayingResponse() {
        return this.hasCCInfo && this.body.waitList
            ? this.respond( { body: { message: 'All slots have filled.  You have been added to the wait list.' } } )
            : this.respond( { body: { message: 'You have been added to the wait list.' } } )
    },

    pay( byopId ) {
        return this.Stripe.charge( {
            amount: Math.floor( this.body.total * 100 ),
            metadata: { byopId, names: `${this.body.name1}, ${this.body.name2}` },
            receipt_email: this.body.email,
            source: {
                exp_month: this.body.ccMonth,
                exp_year: this.body.ccYear,
                number: this.body.ccNo,
                object: 'card',
                cvc: this.body.cvc
            },
            statement_descriptor: 'HazyShade BYOP'
        } )
        .catch( e => {
            console.log( e.stack || e )
            return this.Postgres.query( `DELETE FROM byop WHERE id = ${byopId}` )
            .then( () => this.respond( { stopChain: true, code: 500, body: { message: 'Error processing payment.  Please try again.' } } ) )
        } )
        .then( charge => this.Postgres.update( 'byop', { stripeChargeId: charge.id, hasPaid: true }, { id: byopId } ) )
        .then( () => this.respond( { body: { message: 'Great Job!' } } ) )
    },

    validate() {
        this.division = this.Postgres.divisions.store.id[ this.body.divisionId ]
        this.hasCCInfo = Boolean( this.body.ccName && this.body.ccNo && this.body.ccMonth && this.body.ccYear && this.body.cvc )
        this.belmontDonation = Number.parseFloat( this.body.belmontDonation )
        this.total = Number.parseFloat( this.body.total )

        if( Number.isNaN( this.belmontDonation ) ) this.body.belmontDonation = 0 

        this.Byop.generatedAttrs.forEach( attr => {
            if( this.body[ attr ] !== undefined ) this.respond( { stopChain: true, code: 500, body: { message: `${attr} disallowed.` } } )
        } )

        this.Byop.requiredAttrs.forEach( attr => {
            if( this.body[ attr ] === undefined ) this.respond( { stopChain: true, code: 500, body: { message: `${attr} required.` } } )
        } )

        if( ! this.division ) return this.respond( { stopChain: true, code: 500, body: { message: 'Invalid Division' } } )

        if( Number.isNaN( this.total ) ) return this.respond( { stopChain: true, code: 500, body: { message: 'Invalid Total.' } } )

        if( this.body.paidCash && !this.user.roles.includes('admin') ) return this.badRequest()

        if( this.body.paidCash ) this.body.hasPaid = true

        return this.checkAvailability( this.division.name )
        .then( () =>
            ( !this.body.waitList && this.total < 120 )
                ? this.respond( { stopChain: true, code: 500, body: { message: 'Invalid Total.' } } )
                : ( ( !this.body.waitList && !this.user.roles.includes('admin') ) && ( !this.hasCCInfo ) )
                    ? this.respond( { stopChain: true, code: 500, body: { message: 'Credit card information is required.' } } )
                    : Promise.resolve( this.validateTotal() ) 
        )
    },

    validateTotal() {
        if( this.body.waitList === true && this.total === 0 ) return

        let price = 120

        if( this.hasCCInfo ) price += 3.5

        if( this.body.ace1 ) price += 5
        if( this.body.ace2 ) price += 5

        if( ( !Number.isNaN( this.belmontDonation ) ) && this.belmontDonation > 0 ) { price += this.belmontDonation }

        if( price !== this.total ) return this.respond( { stopChain: true, code: 500, body: { message: `Doesn't add up.` } } )
    }
} )
