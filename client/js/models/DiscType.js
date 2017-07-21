module.exports = Object.assign( {}, require('./__proto__'), {

    attributes: {
    },

    data: {
    },

    meta: {
        sort: { 'title': 1 }
    },

    resource: 'DiscType',

    toList() {
        return Object.keys( this.model.data ).sort().map( key => ( { key, value: this.model.data[ key ] } ) )
    },

} )
