module.exports = Object.assign( { }, require('./__proto__'), {

    events: {
        byop: 'click',
    },

    model: [
        { name: 'byop', label: 'Manage Byop', roles: new Set( [ 'superuser' ] ) }
    ],

    hideSplash() { return this.hideEl( this.els.splash ) },

    onByopClick() {
        this.emit( 'navigate', `/admin/manage-byop`, { silent: true } )

        return this.showByop()
    },

    onNavigation( path ) {
        if( path[0] === 'manage-byop' ) return this.showByop()
    },

    postRender() {

        this.model.forEach( ( button, i ) => {
            if( this.user.data.roles.filter( role => button.roles.has( role ) ).length ) {
                this.slurpTemplate( { template: `<button data-js="${button.name}">${button.label}</button>`, insertion: { el: this.els[ `column${ i % 2 }` ] } } )
            }
        } )

        if( this.path.length > 1 ) this.onNavigation( this.path.slice( 1 ) )

        return this
    },

    requiresLogin: true,

    requiresRole: 'admin',

    showByop() {
        return this.hideEl( this.els.splash )
        .then( () => {
            if( this.manageByop ) return this.manageByop.show()
            this.manageByop = this.factory.create( 'manageByop', { insertion: { value: { el: this.els.views } } } )
            return Promise.resolve()
        } )
        .catch( this.Error )
    }
} )
