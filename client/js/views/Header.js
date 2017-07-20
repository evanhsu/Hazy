module.exports = Object.assign( {}, require('./__proto__'), {

    data: [
        'shop',
        'courses',
        'events'
    ],

    disableTypeAhead() {
        if( !this.views.typeAhead ) return Promise.resolve()

        delete this.Views.typeAhead 
        this.els.container.classList.remove( 'has-typeahead' )
        return this.views.typeAhead.delete()
    },

    enableTypeAhead( meta ) {
        this.Views = Object.assign( this.Views || {}, { typeAhead: meta } )
        this.slurpTemplate( { template: `<li><div data-view="typeAhead"></div></li>`, insertion: { el: this.els.profileBtn, method: 'insertBefore' } } )
        this.renderSubviews()
        this.els.container.classList.add( 'has-typeahead' )
        this.views.typeAhead.on( 'itemSelected', item => this.emit( 'itemSelected', item ) )
    },

    events: {
        logo: 'click',
        logout: 'click'
    },

    onLogoClick() { this.emit( 'navigate', '/' ) },

    onLogoutClick() {
        this.user.logout()
    },

    onUserLogin() {
        this.els.profileBtn.classList.remove('hidden')        
        this.els.name.textContent = this.user.data.name || this.user.data.email
    },

    onUserLogout() {
        this.els.profileBtn.classList.add('hidden')        
        this.els.name.textContent = ''
    },

    postRender() {

        if( this.user.isLoggedIn() ) this.onUserLogin()

        this.user.on( 'got', () => { if( this.user.isLoggedIn() ) this.onUserLogin() } )
        this.user.on( 'logout', () => this.onUserLogout() )

        return this
    }

} )
