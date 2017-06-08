module.exports = Object.assign( { }, require('./__proto__'), {

    events: {
        byop: 'click',
    },

    model: [
        { name: 'byop', label: 'Manage Byop', roles: new Set( [ 'superuser' ] ) }
    ],

    onByopClick() {
        this.emit( 'navigate', `/admin/manage-byop`, { silent: true } )

        this.hideEl( this.els.splash )
        .then( () => {
            if( this.manageByop ) return this.manageByop.show()
            this.manageByop = this.factory.create( 'manageByop', { insertion: { value: { el: this.els.views } } } )
            return Promise.resolve()
        } )
        .catch( this.Error )
    },

    postRender() {

        this.model.forEach( ( button, i ) => {
            if( this.user.data.roles.filter( role => button.roles.has( role ) ).length ) {
                this.slurpTemplate( { template: `<button data-js="${button.name}">${button.label}</button>`, insertion: { el: this.els[ `column${ i % 2 }` ] } } )
            }
        } )

        return this
    },

    requiresLogin: true,

    requiresRole: 'admin'
} )
