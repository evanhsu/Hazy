module.exports = Object.create( Object.assign( {}, require('../../lib/MyObject'), {
    
    Stripe: require('stripe')( process.env.STRIPE_KEY ),

    charge( data ) {
        return this.P( this.Stripe.charges.create, [ Object.assign( { currency: 'USD' }, data ) ], this.Stripe.charges )
        .then( ( [ charge ] ) => Promise.resolve( charge ) )
    }

} ), { } )
