module.exports = Object.assign( { }, require('./__proto__'), {

    apply( method ) {
        if( method !== "POST" ) return this.badRequest()

        return this.POST()
    },

    POST() {
        return this.getUser()
        .then( () =>
            this.user.roles.includes('superuser')
                ? this.slurpBody()
                : this.badRequest()
        )
        .then( () => this.Postgres.query( `SELECT * FROM byop WHERE id = $1`, [ this.body.out ] ) )
        .then( ( [ removeFromEventRecord ] ) =>
            removeFromEventRecord.paidCash === false && removeFromEventRecord.stripeChargeId
                ? this.handleStripeCredit( removeFromEventRecord )
                : this.handleCashRefund( removeFromEventRecord )
        )
    },

    Stripe: require('./lib/Stripe'),

    handleCashRefund( record ) {
        return this.Postgres.transaction( [
            [ `UPDATE byop SET "removedFromEvent" = true WHERE id = $1`, [ this.body.out ] ],
            [ `UPDATE byop SET "waitList" = false, "divisionId" = $1 WHERE id = $2`, [ this.body.divisionId, this.body.in ] ]
        ] )
        .then( () => this.respond( { body: { } } ) )
    },

    handleStripeCredit( record ) {
        return this.Stripe.refund( record.stripeChargeId )
        .catch( e => {
            console.log( e )
            this.respond( { stopChain: true, code: 500, body: { message: 'Failed to refund via Stripe.  Try again, or hit Chris Baron up.' } } )
        } )
        .then( refund =>
            this.Postgres.transaction( [
                [ `UPDATE byop SET refunded = true, "removedFromEvent" = true, "stripeRefundId" = $1 WHERE id = $2`, [ refund.id, this.body.out ] ],
                [ `UPDATE byop SET "waitList" = false, "divisionId" = $1 WHERE id = $2`, [ this.body.divisionId, this.body.in ] ]
            ] )
        )
        .then( () => this.respond( { body: { } } ) )
    }
} )
