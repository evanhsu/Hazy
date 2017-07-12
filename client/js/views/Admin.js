module.exports = Object.assign( { }, require('./__proto__'), {

    events: {
        manageDiscTypes: 'click',
        manageByop: 'click',
    },

    model: {
        manageByop: { label: 'Manage Byop', roles: new Set( [ 'superuser' ] ), url: 'manage-byop' },
        manageDiscTypes: { label: 'Manage Disc Types', roles: new Set( [ 'superuser' ] ), url: 'manage-disc-types' }
    },

    onManageDiscTypesClick() {
        this.emit( 'navigate', `/admin/manage-disc-types`, { silent: true } )
        return this.showView( 'manageDiscTypes' )
    },

    onManageByopClick() {
        this.emit( 'navigate', `/admin/manage-byop`, { silent: true } )
        return this.showView( 'manageByop' )
    },

    onNavigation( path ) {
        const key = this.keys.find( key => this.model[ key ].url === 'path' )

        if( key === undefined ) return this.emit( 'navigate', '/admin')

        this.showView( key )
    },

    postRender() {
        this.keys = Object.keys( this.model )

        this.keys.forEach( ( name, i ) => {
            if( this.user.data.roles.filter( role => this.model[ name ].roles.has( role ) ).length ) {
                this.slurpTemplate( { template: `<button data-js="${name}">${this.model[ name ].label}</button>`, insertion: { el: this.els[ `column${ i % 2 }` ] } } )
            }
        } )

        this.currentEl = this.els.splash

        if( this.path.length > 1 ) this.onNavigation( this.path.slice( 1 ) )

        return this
    },

    requiresLogin: true,

    requiresRole: 'admin',

    showView( key ) {
        return this.hideEl( this.currentEl )
        .then( () => {
            this.model[ key ].view 
                ? this.model[ key ].view.show()
                : this.model[ key ].view = this.factory.create( key, { insertion: { value: { el: this.els.views } } } )
            
            this.currentEl = this.model[ key ].view.getContainer()
            return Promise.resolve()
        } )
        .catch( this.Error )
    }
} )
