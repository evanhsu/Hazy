module.exports = Object.assign( {}, require('./__proto__'), {

    Model: require('../models/Json'),

    addItem( value ) {
        this.views.push( this.factory.create( this.Model.getViewName( value ), { model: { value: { data: value } }, insertion: { value: { el: this.els.container } } } ) )
    },

    displayData() {
        Object.keys( this.model.data ).forEach( value => this.addItem( value ) )
    },

    postRender() {
        this.views = [ ]

        if( !this.model ) return
        
        this.model = this.Model.constructor( this.model.data )

        this.displayData()

        return this
    },

    update( data ) {

        Promise.all( Object.keys( this.views ).forEach( view => view.delete() ) )
        .then( () => {
            Object.assign( this, { model: { data }, views: [ ] } )
            this.displayData()
            return Promise.resolve()
        } )
        .catch( this.Error )
    },
} )
