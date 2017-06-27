module.exports = Object.assign( {}, require('./__proto__'), {

    Byop: require('../models/Byop'),

    addTeam( team ) {
        this.model.data.players.push( team )

        this.slurpTemplate( {
            template: `<li><div><div><span>${team.name1}, ${team.name2}</span><span class="disc-selection">${this.getDiscLabel(team.disc1)}(${team.weight1}g), ${this.getDiscLabel(team.disc2)}(${team.weight2}g)</span></div></div></li>`,
            insertion: { el: this.els.players }
        } )
    },

    getDiscLabel( value ) {
        const disc = this.discs.store.value[ value ]
        return disc ? disc.label : 'Undecided'
    },

    notifyIfEmpty() {
        if( this.model.data.players.length === 0 ) this.els.isEmpty.classList.remove('hidden')
    },

    postRender() {
        this.model.data.players = [ ]
       
        this.discs =
            this.Model.constructor(
                this.Byop.meta.discs.map( disc => ( { value: disc.value, label: disc.label.slice( 0, disc.label.indexOf('(') ) } ) ),
                { storeBy: [ 'value' ] }
            )

        return this
    }

} )
