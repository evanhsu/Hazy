module.exports = Object.assign( { }, require('./__proto__'), {

    events: {
        logout: 'click'
    },

    onLogoutClick() {
        this.user.logout()
    },

    requiresLogin: true,

    requiresRole: 'admin'
} )
