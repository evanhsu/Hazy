const DiscType = require('../models/DiscType')

module.exports = Object.assign( { }, require('./__proto__'), {

    Views: {

        discTypesList: {

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

            events: { value: { list: 'click' } },
            itemTemplate: { value: require('./templates/DiscType') }
            leftPanel: { value: true },
            model: { value: Object.create( DiscType ) }
        },   

        discTypeJson: {

            Views: { value: {
                buttonFlow: { model: { value: { data: {
                    disabled: true,
                    states: { 
                        start: [
                            { name: 'delete', svg: require('./templates/lib/garbage')( { name: 'delete' } ), nextState: 'confirmDelete' }
                        ],
                        confirmDelete: [
                            { name: 'confirmDelete', text: 'Delete Property?', emit: true, nextState: 'start' },
                            { name: 'cancel', svg: require('./templates/lib/ex')(), nextState: 'start' }
                        ]
                    }
                } } } },
            } },

            item: { value: 'jsonProperty' },
            model: {
                value: Object.create( this.Model ).constructor( [], { meta: { key: 'key' } } )
            }
        }
        

    },

    discType: Object.create( DiscType ),

    onItemSelected( item ) {
        this.discType.constructor( item )

        this.views.discTypeList.update( this.discType.toList() )
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
            this.views.discTypeJson.update( this.discType.data[0] )
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
