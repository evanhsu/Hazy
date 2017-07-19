module.exports = Object.assign( {}, require('./__proto__'), {

    data: [
        'shop',
        'courses',
        'events'
    ],

    enableTypeAhead( meta ) {
        this.slurpTemplate( { template: `<div data-view="typeAhead"></div>`, insertion: { el: this.els.profileBtn, method: 'insertBefore' } } )
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
