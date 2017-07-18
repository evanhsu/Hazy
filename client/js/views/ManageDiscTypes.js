module.exports = Object.assign( { }, require('./__proto__'), {

     Views: {

        list: {
            model: { value: require('../models/DiscType') },
            leftPanel: { value: true },
            pageSize: { value: 100 },
            sort: { value: { 'title': 1 } },
            itemTemplate: { value: require('./templates/DiscType') }
        },

        typeAhead: {
            Resource: { value: 'DiscType' },
            templateOptions: { value: { label: 'Search Disc Types' } }
        }
    }
} )
