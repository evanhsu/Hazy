module.exports = Object.assign( {}, require('./__proto__'), {

    attributes: {
    },

    data: {
    },

    meta: {
        key: 'key'
    },

    isEditable( key ) { return key !== '_id' }

} )
