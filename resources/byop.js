module.exports = Object.assign( { }, require('./__proto__'), {

    Stripe: require('./lib/Stripe'),

    POST() {
        this.getUser()
        .then( () => this.slurpBody() )
        .then( () => this.validate() )
        .then( () => this.Postgres.insert( 'byop', this.body ) )
        .then( ( [ { id } ] ) =>
            this.hasCCInfo && (!this.body.waitList)
                ? this.pay( id )
                : this.nonPayingResponse()
        )
    },

    checkAvailability( day ) {
        const in = day === "sat" ? `IN` : `NOT IN`
        return this.Postgres.query(
            `SELECT count(*) FROM byop WHERE "divisionId" ${in} ( $1, $2 )`,
            [ this.Postgres.divisions.store.name[ 'rec' ].id, this.Postgres.divisions.store.name[ 'rec' ].id ]
        )
        .then( ( [ { count } ] ) => Promise.resolve( this.body.waitList = Boolean( count >= 108 ) ) )
    },

    nonPayingResponse() {
        return this.hasCCInfo && this.body.waitList
            ? this.respond( { body: { message: 'All slots have filled.  You have been added to the wait list.' } } )
            : this.respond( { body: { message: 'You have been added to the wait list' } } )
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
        .then( charge => this.Postgres.update( 'byop', { stripeChargeId: charge.id, hasPaid: true }, { id: byopId } ) )
        .then( () => this.respond( { body: { message: 'Great Job!' } } ) )
    },

    validate() {
        this.division = this.Postgres.divisions.store.id[ this.body.divisionId ]
        this.hasCCInfo = Boolean( this.body.ccName && this.body.ccNo && this.body.ccMonth && this.body.ccYear && this.body.ccv )

        if( ! this.division ) return this.respond( { stopChain: true, code: 500, message: 'Invalid Division' } )

        return ( this.division.name === 'rec' || this.division.name === 'int'
            ? this.checkAvailability( 'sat' )
            : this.checkAvailability( 'sun' )
        )
        .then( () =>
            ( !this.user.roles.includes('admin') ) && ( !this.hasCCInfo )
                ? this.respond( { stopChain: true, code: 500, message: 'Credit card information is required' } )
                : Promise.resolve() 
        )

        return Promise.resolve()
    }
} )
