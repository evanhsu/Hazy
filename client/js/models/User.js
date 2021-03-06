module.exports = Object.create( Object.assign( {}, require('./__proto__.js'), {

    isLoggedIn() {
           return Boolean( this.data && this.data.id )  
    },

    logout() {
        document.cookie = `hzy=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`

        this.data = { }
        this.emit('logout')
    },

} ), { resource: { value: 'me' } } )
