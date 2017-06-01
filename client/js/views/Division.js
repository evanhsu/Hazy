module.exports = Object.assign( {}, require('./__proto__'), {

    addTeam( team ) {
        this.model.data.players.push( team )

        this.slurpTemplate( { template: `<li>${team.name1}, ${team.name2}</li>`, insertion: { el: this.els.players } } )
    },

    notifyIfEmpty() {
        if( this.model.data.players.length === 0 ) this.els.isEmpty.classList.remove('hide')
    },

    postRender() {
        this.model.data.players = [ ]

        return this
    }

} )
