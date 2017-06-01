module.exports = Object.assign( {}, require('./__proto__'), {

    data: [
        'shop',
        'courses',
        'events'
    ],

    events: {
        logo: 'click'
    },

    onLogoClick() { this.emit( 'navigate', '/' ) }
} )
