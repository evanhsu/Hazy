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
        this.slurpTemplate( {
            insertion: { el: this.els.list },
            renderSubviews: true,
            template: this.model.data.reduce(
                ( memo, datum ) => {
                    this.model.store[ this.key ][ datum[ this.key ] = datum
                    if( this.item ) this.itemViews[ this.key ] = this.factory.create( this.item ).constructor( { model: { data: datum }, storeFragment: true } )
                    return memo + this.item ? this.itemViews[ this.key ].fragthis.itemTemplate( datum )
                },
                ''
            )
        } )
    },

    postRender() {
        this.skip = this.skip || 0
        this.pageSize = this.pageSize || 100
        this.key = this.model.meta.key || '_id'
        this.model.store = { [ this.key ]: { } }

        this.model.get( { query: { skip: this.skip, limit: this.pageSize, sort: this.model.meta.sort || { } } } )
        .then( () => this.populateList() )
        .catch( this.Error )

        return this
    },

    update( items ) {
        this.model.constructor( items )

        if( this.itemTemplate ) return this.removeChildren().popuplateList()

        Promise.all( Object.keys( this.itemViews ).map( key => this.deleteItemView( key ) )
        .then( () => {
            Object.assign( this, { itemViews: { } } )
            this.populateList()
            return Promise.resolve()
        } )
        .catch( this.Error )
    }
} )
