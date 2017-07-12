module.exports = Object.assign( {}, require('./__proto__'), {

    AutoComplete: require('./lib/AutoComplete'),

    Resources: {

        Byop: {
            Model: require('../models/Byop')
            onSelect: ( e, term, item ) => {
                this.emit( 'teamSelected', this.resource.Model.store.id[ e.target.getAttribute( 'data-id' ) ] )
            },
            renderItem: ( item, search ) => {
                const value = `${item.name1}, ${item.name2}`
                return `<div class="autocomplete-suggestion" data-val="${value}" data-id="${item.id}">${value}</div>`
            },
            search( term, suggest ) {
                return Promise.all( [
                    this.Xhr( { method: 'get', qs: this.getQs( 'name1', term ), resource: 'byop' } ),
                    this.Xhr( { method: 'get', qs: this.getQs('name2', term ), resource: 'byop' } )
                ] )
                .then( ( [ name1Data, name2Data ] ) => {
                    if( name1Data.length === 0 && name2Data.length === 0 ) return Promise.resolve( false )
                
                    name2Data = name2Data.filter( datum2 => name1Data.find( datum1 => datum1.id == datum2.id ) === undefined )
                    
                    this.resource.Model.constructor( name1Data.concat( name2Data ), { storeBy: [ 'id' ] } )
                    suggest( this.resource.Model.data )
                    return Promise.resolve( true )
                } )
            }
        },

        Byop: {
            Model: require('../models/DiscType')
            onSelect: ( e, term, item ) => {
                this.emit( 'discTypeSelected', this.resource.Model.store.id[ e.target.getAttribute( 'data-id' ) ] )
            },
            renderItem: ( item, search ) => `<div class="autocomplete-suggestion" data-val="${value}" data-id="${item.id}">${item.title}</div>`,
            search( term, suggest ) {
                this.Xhr( { method: 'get', qs: this.getQs( 'name1', term ), resource: 'DiscType' } ),
                .then( discTypes => {
                    if( discTypes.length === 0 ) return Promise.resolve( false )
                
                    this.resource.Model.constructor( discTypes, { storeBy: [ 'id' ] } )
                    suggest( this.resource.Model.data )
                    return Promise.resolve( true )
                } )
            }
        }
    },

    clear( suppressEmit ) {
        this.els.input.value = ''
        if( !suppressEmit ) this.emit('cleared')
    },

    events: {
        input: 'input'
    },
    
    focus() { this.els.input.focus() },

    getQs( attr, term ) {
        return JSON.stringify( Object.assign( this.query || {}, { [ attr ]: { operation: '~*', value: term } } ) )
    },

    onInputInput() {
        if( this.els.input.value.trim() === "" ) this.emit('cleared')
    },

    postRender() {
        this.resource = this.Resources[ this.Resource ] || 'Byop'

        new this.AutoComplete( {
            delay: 500,
            selector: this.els.input,
            minChars: 3,
            cache: false,
            renderItem: this.resource.renderItem,
            source: ( term, suggest ) => {
                Reflect.apply( this.search, this, [ term.trim(), suggest ] )
                .then( found => found ? Promise.resolve(true) : suggest([]) )
                .catch( this.Error )
            },
            onSelect: this.resource.onSelect.bind( this )
        } )

        return this
    }
} )
