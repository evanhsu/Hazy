const DiscType = require('../models/DiscType')

module.exports = Object.assign( { }, require('./__proto__'), {

    Views: {

        discTypesList: {

            Views: { 
                buttonFlow: { model: { data: {
                    disabled: true,
                    states: { 
                        start: [
                            { name: 'edit', svg: require('./templates/lib/pencil')( { name: 'edit' } ), emit: true },
                            { name: 'delete', svg: require('./templates/lib/garbage')( { name: 'delete' } ), nextState: 'confirmDelete' }
                        ],
                        confirmDelete: [
                            { name: 'confirmDelete', text: 'Delete Disc Type?', emit: true, nextState: 'start' },
                            { name: 'cancel', svg: require('./templates/lib/ex')( { name: 'cancel' } ), nextState: 'start' }
                        ]
                    }
                } } },
            },

            events: { list: 'click' },
            itemTemplate: require('./templates/DiscType'),
            leftPanel: true,
            model: Object.create( DiscType )
        },   

        discTypeJson: {
            item: 'jsonProperty',
            Model: require('../models/JsonProperty')
        }
    },

    discType: Object.create( DiscType ),
    
    events: {
        addButton: 'click'
    },

    onAddButtonClick() {
        this.views.discTypeJson.add( { key: 'new key', value: 'new value' } )
        return
        const time = new Date().getTime()
        this.slurpTemplate( { template: this.Templates.Key( time, 'new-attribute', true ), insertion: { el: this.els.data } } )
        this.views[ time ] =
            this.factory.create( 'literal', { model: { data: 'new-value', meta: { editable: true } }, insertion: { el: this.els[time] } } )

        this.els[ time ].firstChild.focus()
    },

    onItemSelected( item ) {
        this.discType.constructor( item )

        this.views.discTypeJson.update( DiscType.toList( item ) )
        this.emit( 'navigate', item.name, { append: true, silent: true } )

        if( this.views.discTypesList.isHidden() ) return

        this.views.discTypesList.hide()
        .then( () => this.views.discTypeJson.show() )
        .catch( this.Error )
    },

    onNavigation( path ) {

        this.discType.get( { query: { name: path[0] } } )
        .then( () => {
            if( this.discType.data.length === 0 ) return Promise.resolve( this.emit( 'navigate', '/admin/manage-disc-types' ) )
            this.views.discTypeJson.update( DiscType.toList( this.discType.data[0] ) )
            return this.views.discTypesList.isHidden()
                ? Promise.resolve()
                : this.views.discTypesList.hide()
        } )
        .catch( this.Error )
    },

    postRender() {
        this.views.discTypesList.on( 'itemSelected', item => this.onItemSelected( item ) )

        if( this.path.length === 2 ) this.onNavigation( this.path.slice(1) )

        return this
    }

} )
