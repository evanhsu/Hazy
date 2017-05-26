module.exports = Object.assign( { }, require('./__proto__'), {

    Byop: require('../models/Byop'),

    Stripe: require('./lib/Stripe'),

    DELETE() { return this.respond( { body: { }, code: 404 } ) },

    PATCH() { return this.respond( { body: { }, code: 404 } ) },

    POST() {
        return this.getUser()
        .then( () => this.slurpBody() )
        .then( () => this.validate() )
        .then( () => this.Postgres.insert( 'byop', this.omit( this.body, [ 'ccName', 'ccNo', 'ccMonth', 'ccYear', 'cvc' ] ) ) )
        .then( ( [ { id } ] ) =>
            this.hasCCInfo && (!this.body.waitList)
                ? this.pay( id )
                : this.nonPayingResponse()
        )
    },

    checkAvailability( day ) {
        return Reflect.apply( this.Common.isFull, this, [ day ] )
        .then( result => Promise.resolve( this.body.waitList = result ) )
    },

    nonPayingResponse() {
        return this.hasCCInfo && this.body.waitList
            ? this.respond( { body: { message: 'All slots have filled.  You have been added to the wait list.' } } )
            : this.respond( { body: { message: 'You have been added to the wait list.' } } )
    },

    pay( byopId ) {
        return this.Stripe.charge( {
            amount: Math.floor( this.body.total * 100 ),
            metadata: { byopId },
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
        .catch( e => 
            this.Postgres.query( `DELETE FROM byop WHERE id = ${byopId}` )
            .then( () => this.respond( { stopChain: true, code: 500, body: { message: 'Error processing payment.  Please try again.' } } ) )
        )
        .then( charge => this.Postgres.update( 'byop', { stripeChargeId: charge.id, hasPaid: true }, { id: byopId } ) )
        .then( () => this.respond( { body: { message: 'Great Job!' } } ) )
    },

    validate() {
        this.division = this.Postgres.divisions.store.id[ this.body.divisionId ]
        this.hasCCInfo = Boolean( this.body.ccName && this.body.ccNo && this.body.ccMonth && this.body.ccYear && this.body.cvc )
        this.belmontDonation = Number.parseFloat( this.body.belmontDonation )
        this.total = Number.parseFloat( this.body.total )

        this.Byop.requiredAttrs.forEach( attr => {
            if( this.body[ attr ] === undefined ) this.respond( { stopChain: true, code: 500, body: { message: `${attr} required.` } } )
        } )

        if( ! this.division ) return this.respond( { stopChain: true, code: 500, body: { message: 'Invalid Division' } } )

        if( Number.isNaN( this.total ) || this.total < 123.5 ) return this.respond( { stopChain: true, code: 500, body: { message: 'Invalid Total.' } } )

        return ( this.division.name === 'rec' || this.division.name === 'int'
            ? this.checkAvailability( 'sat' )
            : this.checkAvailability( 'sun' )
        )
        .then( () =>
            ( !this.body.waitList && !this.user.roles.includes('admin') ) && ( !this.hasCCInfo )
                ? this.respond( { stopChain: true, code: 500, body: { message: 'Credit card information is required.' } } )
                : Promise.resolve( this.validateTotal() ) 
        )
    },

    validateTotal() {
        let price = 123.5

        if( this.body.ace1 ) price += 5
        if( this.body.ace2 ) price += 5

        if( ! Number.isNaN( this.belmontDonation ) ) { price += this.belmontDonation }

        if( price !== this.total ) return this.respond( { stopChain: true, code: 500, body: { message: `Doesn't add up.` } } )
    }
} )
