module.exports = Object.assign( {}, require('./__proto__'), {

    Byops: Object.create( require('../models/__proto__'), { resource: { value: 'byopFriday' } } ),

    WaitingList: Object.create( require('../models/__proto__'), { resource: { value: 'waiting-list' } } ),

    events: {
        byopRegisterLink: 'click'
    },

    onByopRegisterLinkClick() {
        this.emit( 'navigate', '/byop-friday' )
    },

    postRender() {

        Promise.all( [ this.Byops.get() ] )
        .then( () => this.renderPlayers() )
        .catch( e => this.Error(e) )

        this.WaitingList.get( { query: { day: 'friday' } } )
        .then( () => this.renderWaitingList() )
        .catch( e => this.Error(e) )

        return this
    },

    renderPlayers() {
        this.Byops.data.forEach( datum => this.slurpTemplate( { template: `<li>${datum.name}</li>`, insertion: { el: this.els.registeredList } } ) )
    },

    renderWaitingList() {
        this.WaitingList.data.forEach( datum => this.slurpTemplate( { template: `<li>${datum.name1}, ${datum.name2}</li>`, insertion: { el: this.els.waitingList } } ) )
    }
} )
