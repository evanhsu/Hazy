module.exports = Object.assign( {}, require('./__proto__'), {

    AutoComplete: require('./lib/AutoComplete'),

    focus() { this.els.input.focus() },
    
    Model: require('../models/Byop'),

    postRender() {
        new this.AutoComplete( {
            delay: 500,
            selector: this.els.input,
            minChars: 3,
            cache: false,
            renderItem: ( item, search ) => {
                return `<div class="autocomplete-suggestion" data-val="${item.id}">${item.name1}, ${item.name2}</div>` },
            source: ( term, suggest ) => {
                this.search( 'name1', term.trim(), suggest )
                .then( found => found ? Promise.resolve(true) : this.search( 'name2', term.trim(), suggest ) )
                .then( found => found ? Promise.resolve(true) : suggest([]) )
                .catch( this.Error )
            },
            onSelect: ( e, term, item ) => {
                this.selectedCustomer = this.model.data.find( datum => datum.person.data[ this.attr ] === term )
                this.emit( 'customerSelected', this.selectedCustomer )
            }

        } )

        return this
    },

    search( attr, term, suggest ) {
        return this.Xhr( { method: 'get', qs: JSON.stringify( { [attr]: { operation: '~*', value: term } } ), resource: 'byop' } )
        .then( data => {
            if( ! data.length ) return Promise.resolve( false )
            
            this.attrFound = attr            
            suggest( data )
            return Promise.resolve( true )
        } )
    }
} )
