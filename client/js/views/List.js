module.exports = Object.assign( { }, require('./__proto__'), {

    deleteItemView( key ) {
        return this.views[key].delete()
            .then( () => {
                this.els.container.removeChild( this.els[ key ] )
                delete this.els[ key ]
                return Promise.resolve()
            } )
    },

    events: {
        list: 'click'
    },

    onListClick( e ) {
        const el = e.target.closest('LI')

        if( !el ) return

        this.emit( 'itemSelected', this.model.store[ '_id' ][ el.getAttribute('data-id') ] )
    },

    populateList() {
        if( this.item ) {
            const fragment =
                this.model.data.reduce(
                    ( fragment, datum ) => {
                        const keyValue = datum[ this.key ]
                        this.model.store[ this.key ][ keyValue ] = datum
                        this.itemViews[ keyValue ] = this.factory.create( this.item, { model: Object.create( this.Model ).constructor( datum ), storeFragment: true } )
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

        Promise.all( Object.keys( this.itemViews || { } ).map( key => this.deleteItemView( key ) ) )
        .then( () => {
            Object.assign( this, { itemViews: { } } )
            this.populateList()
            return Promise.resolve()
        } )
        .catch( this.Error )
    }
} )
