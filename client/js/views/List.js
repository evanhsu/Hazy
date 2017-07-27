module.exports = Object.assign( { }, require('./__proto__'), {

    add( datum ) {
        if( !this.model ) this.model = Object.create( this.Model )

        const insertion = { el: this.els.list }

        this.model.add( datum )

        if( this.itemTemplate ) return this.slurpTemplate( { insertion, renderSubviews: true, template: this.itemTemplate( datum ) } )

        this.itemViews[ datum[ this.key ] ] =
            this.factory.create( this.item, { insertion, model: Object.create( this.Model ).constructor( datum ) } )
            .on( 'deleted', () => this.onDeleted( datum ) )

    },

    onDeleted( datum ) {
        this.model.remove( datum )

        if( this.item ) {
            delete this.itemViews[ datum[ this.key ] ]
        } else {
            const child = this.els.list.querySelector( `[data-key="${datum[ this.key ]}"]` )

            if( child ) this.els.list.removeChild( child )
        }
    },

    empty() {
        this.els.list.innerHTML = ''
    },

    onListClick( e ) {
        const el = e.target.closest('LI')

        if( !el ) return

        this.emit( 'itemSelected', this.model.store[ this.key ][ el.getAttribute('data-key') ] )
    },

    populateList() {
        if( this.item ) {
            const fragment =
                this.model.data.reduce(
                    ( fragment, datum ) => {
                        const keyValue = datum[ this.key ]
                        this.model.store[ this.key ][ keyValue ] = datum

                        this.itemViews[ keyValue ] =
                            this.factory.create( this.item, { model: Object.create( this.Model ).constructor( datum ), storeFragment: true } )
                                .on( 'deleted', () => this.onDeleted( datum ) )

                        while( this.itemViews[ keyValue ].fragment.firstChild ) fragment.appendChild( this.itemViews[ keyValue ].fragment.firstChild )
                        return fragment
                    },
                    document.createDocumentFragment()
                )

            this.els.list.appendChild( fragment )
        } else {
            this.slurpTemplate( {
                insertion: { el: this.els.list },
                renderSubviews: true,
                template: this.model.data.reduce(
                    ( memo, datum ) => {
                        this.model.store[ this.key ][ datum[ this.key ] ] = datum
                        return memo + this.itemTemplate( datum )
                    },
                    ''
                )
            } )
        }
    },

    postRender() {
        this.skip = this.skip || 0
        this.pageSize = this.pageSize || 100
        this.key = this.Model.meta ? this.Model.meta.key : '_id'

        if( this.model ) this.model.store = { [ this.key ]: { } }

        if( this.model ) {
            this.model.get( { query: { skip: this.skip, limit: this.pageSize, sort: this.model.meta.sort || { } } } )
            .then( () => this.populateList() )
            .catch( this.Error )
        }

        return this
    },

    update( items ) {
        if( !this.model ) this.model = Object.create( this.Model )

        this.model.constructor( items, { storeBy: [ this.key ] } )

        if( this.itemTemplate ) return this.removeChildren( this.els.list ).populateList()

        this.empty()
        
        Object.assign( this, { itemViews: { } } ).populateList()
    }
} )
