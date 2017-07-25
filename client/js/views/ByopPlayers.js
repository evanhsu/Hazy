module.exports = Object.assign( {}, require('./__proto__'), {

    Divisions: Object.create( require('../models/__proto__'), { resource: { value: 'division' } } ),
    Byops: Object.create( require('../models/__proto__'), { resource: { value: 'byop' } } ),
    WaitingList: Object.create( require('../models/__proto__'), { resource: { value: 'waiting-list' } } ),

    events: {
        byopRegisterLink: 'click'
    },

    onByopRegisterLinkClick() {
        this.emit( 'navigate', '/byop' )
    },

    postRender() {

        Promise.all( [ this.Divisions.get(), this.Byops.get() ] )
        .then( () => this.renderPlayers() )
        .catch( e => this.Error(e) )

        this.WaitingList.get()
        .then( () => this.renderWaitingList() )
        .catch( e => this.Error(e) )

        return this
    },

    renderPlayers() {

        this.divisions = this.Divisions.data.reduce(
            ( memo, division ) => Object.assign( memo, { [ division.id ]: this.factory.create( 'division', { model: { data: division }, insertion: { el: this.els.divisions } } ) } ),
            { }
        )

        this.Byops.data.forEach( byop => this.divisions[ byop.divisionId ].addTeam( byop ) )

        Object.keys( this.divisions ).forEach( divisionId => this.divisions[ divisionId ].notifyIfEmpty() )
    },

    renderWaitingList() {
        this.WaitingList.data.forEach( datum => this.slurpTemplate( { template: `<li>${datum.name1}, ${datum.name2}</li>`, insertion: { el: this.els.waitingList } } ) )
    }
} )
