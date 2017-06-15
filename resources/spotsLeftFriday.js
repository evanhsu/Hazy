module.exports = Object.assign( { }, require('./__proto__'), {

    GET() {
        return Reflect.apply( this.Common.spotsTakenFriday, this, [ ] )
        .then( count => this.respond( { body: { spotsLeft: 108 - count } } ) )
    }
} )
