module.exports = Object.create( Object.assign( {}, require('../lib/MyObject'), {
    
    Stripe: require('stripe')( process.env.STRIPE_KEY )

    charge( data ) {
        return this.P( this.Stripe.charges.create, this, [ Object.assign( { currency: 'USD' }, data ) ] )
        .then( ( [ charge ] ) => Promise.resolve( charge ) )
    }

} )

module.exports = new Stripe()
