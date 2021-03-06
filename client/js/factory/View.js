module.exports = Object.create( {

    create( name, opts ) {
        const lower = name
        name = ( name.charAt(0).toUpperCase() + name.slice(1) ).replace( '-', '' )
        return Object.create(
            this.Views[ name ],
            Object.assign( {
                Toast: { value: this.Toast },
                name: { value: name },
                factory: { value: this },
                template: { value: this.Templates[ name ] },
                user: { value: this.User }
                } )
        ).constructor( opts )
    },

}, {
    Templates: { value: require('../.TemplateMap') },
    Toast: { value: require('../views/Toast') },
    User: { value: require('../models/User') },
    Views: { value: require('../.ViewMap') }
} )
