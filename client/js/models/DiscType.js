module.exports = Object.assign( {}, require('./__proto__'), {

    attributes: {
    },

    data: {
    },

    meta: {
        sort: { 'title': 1 }
    },

    resource: 'DiscType',

    toList( model ) {
        return Object.keys( model ).sort().map( key => ( { key, value: model[ key ] } ) )
    },

} )
