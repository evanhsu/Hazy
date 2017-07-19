module.exports = Object.assign( { }, require('./__proto__'), {

     Views: {

        list: {
            Views: { value: {
                buttonFlow: { model: { value: { data: {
                    disabled: true,
                    states: { 
                        start: [
                            { name: 'edit', svg: require('./templates/lib/pencil')( { name: 'edit' } ), emit: true },
                            { name: 'delete', svg: require('./templates/lib/garbage')( { name: 'delete' } ), nextState: 'confirmDelete' }
                        ],
                        confirmDelete: [
                            { name: 'confirmDelete', text: 'Delete Disc Type?', emit: true, nextState: 'start' },
                            { name: 'cancel', svg: require('./templates/lib/ex')(), nextState: 'start' }
                        ]
                    }
                } } } },
            } },
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
    },

    postRender() {

        this.emit( 'enableHeaderTypeAhead', this.Views.typeAhead )

        return this
    },
} )
