module.exports = Object.assign( { }, require('./__proto__'), {

    Byop: Object.create( require('../models/Byop') ),

    events: {
        heading: 'click'
    },

    handleDiscs() {
        this.discs = {}

        Object.keys( this.Byop.store.disc1 ).forEach( disc => {
            if( this.discs[ disc ] === undefined ) this.discs[ disc ] = { }
            this.Byop.store.disc1[ disc ].forEach( datum => {
                if( this.discs[ disc ][ datum.weight1 ] === undefined ) this.discs[ disc ][ datum.weight1 ] = 0
                this.discs[ disc ][ datum.weight1 ]++
            } )
        } )
        Object.keys( this.Byop.store.disc2 ).forEach( disc => {
            if( this.discs[ disc ] === undefined ) this.discs[ disc ] = { }
            this.Byop.store.disc2[ disc ].forEach( datum => {
                if( this.discs[ disc ][ datum.weight2 ] === undefined ) this.discs[ disc ][ datum.weight2 ] = 0
                this.discs[ disc ][ datum.weight2 ]++
            } )
        } )

        Object.keys( this.discs ).forEach( disc => {
            const total = ( this.Byop.store.disc1[ disc ] ? this.Byop.store.disc1[ disc ].length : 0 ) + ( this.Byop.store.disc2[ disc ] ? this.Byop.store.disc2[ disc ].length : 0 )
            this.slurpTemplate( { template: `<div>${disc}: ${total}</div>`, insertion: { el: this.els.playerPack } } )
        } )
    },

    handlePaymentType() {
        const inStoreTotal = this.Byop.store.paidCash[ 'false' ].reduce( ( sum, datum ) 
        Object.keys( this.Byop.store.paidCash ).forEach( trueOrFalse =>
            this.slurpTemplate( { template: `${trueOrFalse
    },

    handleShirts() {
        this.shirts = {}

        Object.keys( this.Byop.store.shirtSize1 ).forEach( size => {
            if( this.shirts[ size ] === undefined ) this.shirts[ size ] = 0
            this.shirts[ size ] += Array.isArray( this.Byop.store.shirtSize1[ size ] ) ? this.Byop.store.shirtSize1[ size ].length : 1
        } )
        
        Object.keys( this.Byop.store.shirtSize2 ).forEach( size => {
            if( this.shirts[ size ] === undefined ) this.shirts[ size ] = 0
            this.shirts[ size ] += Array.isArray( this.Byop.store.shirtSize2[ size ] ) ? this.Byop.store.shirtSize2[ size ].length : 1
        } )

        Object.keys( this.shirts ).forEach( size => {
            this.slurpTemplate( { template: `<div>${size}: ${this.shirts[size]}</div>`, insertion: { el: this.els.shirts } } )
        } )
    },
    
    onHeadingClick() { this.els.content.classList.contains('hidden') ? this.showEl( this.els.content ) : this.hideEl( this.els.content ) },

    postRender() {

        this.Byop.get( { query: { waitList: false, removedFromEvent: false }, storeBy: [ 'ace1', 'ace2', 'shirtSize1', 'shirtSize2', 'disc1', 'disc2', 'paidCash' ] } )
        .then( () => {

            this.handleDiscs()

            this.handleShirts()

            this.els.belmontDonation.textContent =
                this.Format.Currency.format(
                    this.Byop.data.reduce(
                        ( sum, datum ) => {
                            const value = parseFloat( datum.belmontDonation )
                            return sum + ( Number.isNaN( value ) ? 0 : value )
                        },
                        0
                    )
                )

            this.handlePaymentType()
        } )
        .catch( this.Error )

        return this
    }
} )
