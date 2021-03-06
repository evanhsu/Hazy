module.exports = Object.assign( {}, require('./__proto__'), {

    events: {
        addButton: 'click'
    },

    Model: require('../models/Json'),

    Templates: {
        Key: ( key, value, isEditable ) => `<li data-js="${key}"><div contenteditable="${isEditable}">${value || ''}</div><div data-view="buttonFlow" data-name="</li>`,
    },

    addItem( key ) {
        const value = this.model.git( key ),
            isEditable = this.model.isEditable(key)
        this.slurpTemplate( { template: this.Templates.Key( key, key, isEditable ), insertion: { el: this.els.data } } )
        this.views[ key ] =
            this.factory.create( this.model.getViewName( value ), { model: { data: value, meta: { editable: isEditable } }, insertion: { el: this.els[key] } } )
    },

    displayData() {
        Object.keys( this.model.data ).sort().forEach( key => this.addItem( key ) )
    },

    onAddButtonClick() {
        const time = new Date().getTime()
        this.slurpTemplate( { template: this.Templates.Key( time, 'new-attribute', true ), insertion: { el: this.els.data } } )
        this.views[ time ] =
            this.factory.create( 'literal', { model: { data: 'new-value', meta: { editable: true } }, insertion: { el: this.els[time] } } )

        this.els[ time ].firstChild.focus()
    },

    postRender() {
        if( !this.model ) return this
        
        this.model = this.Model.constructor( this.model.data )

        this.displayData()

        return this
    },

    update( data ) {

        Promise.all( Object.keys( this.views ).map( key => 
            this.views[key].delete()
            .then( () => {
                this.els.container.removeChild( this.els[ key ] )
                delete this.els[ key ]
                return Promise.resolve()
            } )
        ) )
        .then( () => {
            Object.assign( this, { model: this.Model.constructor( data ), views: { } } )
            this.displayData()
            return Promise.resolve()
        } )
        .catch( this.Error )
    },

    /*
    addItem( model ) {
        const type = model.get( 'type' ),
            prototype = this.itemTypes[ type ]
   
        require('./util/List').prototype.addItem.call( this, model, prototype )

        this.itemViews[ model.cid ]
            .on( 'rowClicked', () => Array.isArray( this.JSONObject ) 
                    ? this.addNewLiteral()
                    : this.addNewObject() 
            )
            .on( 'addDimension', ( type, model ) => {
                const valueType = this.format.capitalizeFirstLetter( type ),
                    key = model.get( 'key' ),
                    value = ( type === 'object' ) ? { } : [ ],
                    attributes = { key: key, value: value, valueType: valueType, editable: true, expandable: true, newDimension: true }

                this.items.add( new this.models.JSONProperty( attributes, { parse: true } ) ) 
                this.items.remove( model )
            } )
            .on( 'deleteItem', model => this.items.remove( model ) )
            .on( 'addProperty', ( type, model ) => {
                this.addNewObject( model )
                this.items.remove( model )
            } )

    },

    addNewLiteral() {
        this.items.add( new this.models.JSONProperty(
            { value: '', editable: true, newProperty: true }, { parse: true } )
        )
    },

    addNewObject( model ) {
        const key = ( model ) ? model.get( 'value' ) : ''

        this.items.add( new this.models.JSONProperty(
            { key: key, value: '', type: 'object', editable: true, newProperty: true }, { parse: true } )
        )
    },

    collection() { return { comparator: 'key' } },

    getJSON() {
        const total = { },
            arrayTotal = [ ]

        Object.keys( this.itemViews ).forEach( id => {
            let model = this.itemViews[ id ].model,
                key = model.get( 'key' ),
                value = model.get( 'value' ),
                property

            if( value === 'true' || value === 'false' ) value = JSON.parse( value )

            if( key && Array.isArray( this.JSONObject ) ) {
                let obj = { }
                obj[ key ] = value
                property = obj
            } else property = value

            Array.isArray( this.JSONObject )
                ? arrayTotal.push( ( model.get( 'expandable' ) ) ? this.itemViews[ id ].subItems.getJSON() : property )
                : total[ key ] = ( model.get( 'expandable' ) ) ? this.itemViews[ id ].subItems.getJSON() : value
        } )

        return ( arrayTotal.length ) ? arrayTotal : total
    },

    itemTypes: {
        object: require('./Object'),
        array: require('./Array'),
        literal: require('./Literal')
    },

    models: {
        JSONProperty: require('../models/JSONProperty')
    },

    noItemCheck: function() {
        const container = this.templateData.container
        if( this.items.length === 0 ) {
            container.addClass('no-items')
            if( this.editable ) this.templateData.noItemsMessage.css( 'display', 'block' )
        } else {
            container.removeClass('no-items')
            if( this.editable ) this.templateData.noItemsMessage.css( 'display', 'none' )
        }
    },

    postRender() {
        require('./util/List').prototype.postRender.call(this)

        Array.isArray( this.JSONObject )
            ? ( this.newDimension )
                ? this.addNewLiteral()
                : this.processArray( this.JSONObject )
            : ( this.newDimension )
                ? this.addNewObject()
                : this.processObject( this.JSONObject )

        this.templateData.noItemsMessage.on( 'click', () => {
            Array.isArray( this.JSONObject ) ? this.addNewLiteral() : this.addNewObject()
            this.templateData.noItemsMessage.css( 'display', 'none' )
        } )

        this.noItemCheck()
    },

    processArray( jsonArray ) {
        jsonArray.forEach( item => {
            if( Object.prototype.toString.call( item ) === '[object Object]' ) return this.processObject( item )

            this.items.add( new this.models.JSONProperty(
                { key: null, value: item, editable: this.editable }, { parse: true } ) )
        } )
    },

    processObject( jsonObject ) {
        Object.keys( jsonObject ).forEach( key => {
            this.items.add( new this.models.JSONProperty(
                { key: key, value: jsonObject[ key ], editable: this.editable }, { parse: true } ) )
        } )
    },

    template: require('./templates/JSON')
    */

} )
