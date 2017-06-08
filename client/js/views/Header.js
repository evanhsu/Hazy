module.exports = Object.assign( {}, require('./__proto__'), {

    data: [
        'shop',
        'courses',
        'events'
    ],

    events: {
        logo: 'click',
        logout: 'click'
    },

    onLogoClick() { this.emit( 'navigate', '/' ) },

    onLogoutClick() {
        this.user.logout()
    },

    onUserLogin() {
        this.els.profileBtn.classList.remove('hide')        
        this.els.name.textContent = this.user.data.name || this.user.data.email
    },

    onUserLogout() {
        this.els.profileBtn.classList.add('hide')        
        this.els.name.textContent = ''
    },

    postRender() {

        if( this.user.isLoggedIn() ) this.onUserLogin()

        this.user.on( 'got', () => { if( this.user.isLoggedIn() ) this.onUserLogin() } )
        this.user.on( 'logout', () => this.onUserLogout() )

        return this
    }

} )
