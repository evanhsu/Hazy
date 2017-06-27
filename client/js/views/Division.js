module.exports = Object.assign( {}, require('./__proto__'), {

    Byop: require('../models/Byop'),

    Team: require('./templates/Team'),

    addTeam( team ) {
        this.model.data.players.push( team )

        this.slurpTemplate( {
            template: this.Team(
                Object.assign( team, {
                    discs: `${this.getDiscLabel(team.disc1)}(${team.weight1}g), ${this.getDiscLabel(team.disc2)}(${team.weight2}g)`,
                    shirts: `${this.getShirtLabel(team.shirtSize1)}, ${this.getShirtLabel(team.shirtSize2)}`,
                } )
            ),
            insertion: { el: this.els.players }
        } )
    },

    getDiscLabel( value ) {
        const disc = this.discs.store.value[ value ]
        return disc ? disc.label : 'Undecided'
    },

    getShirtLabel( value ) {
        const shirt = this.shirts.store.value[ value ]
        return shirt ? shirt.label : 'Undecided'
    },

    notifyIfEmpty() {
        if( this.model.data.players.length === 0 ) this.els.isEmpty.classList.remove('hidden')
    },

    postRender() {
        this.model.data.players = [ ]
       
        this.discs =
            Object.create( this.Model, {} ).constructor(
                this.Byop.meta.discs.map( disc => ( { value: disc.value, label: disc.label.slice( 0, disc.label.indexOf('(') ) } ) ),
                { storeBy: [ 'value' ] }
            ) 

        this.shirts = Object.create( this.Model, { } ).constructor( this.Byop.meta.shirtSizes, { storeBy: [ 'value' ] } )

        return this
    }

} )
