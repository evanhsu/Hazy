module.exports = Object.create( Object.assign( {}, require('../../lib/MyObject'), {

    apply( name ) { return this[ name ]() },

    constructor() {
        return this.apply.bind(this)
    },
    
    Photo() {
        const qs = `${new Date().getTime()}${this.getRandomInclusiveInteger( 1, 1000 )}`
        return {
            w: 320,
            h: 320,
            uri: `http://loremflickr.com/320/320?${qs}`
        }
    }
} ) ).constructor()
