module.exports = Object.assign( {}, require('./__proto__'), {

    Divisions: Object.create( require('../models/__proto__'), { resource: { value: 'division' } } ),
    Byops: Object.create( require('../models/__proto__'), { resource: { value: 'byop' } } ),

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

        return this
    },

    renderPlayers() {

        this.divisions = this.Divisions.data.reduce(
            ( memo, division ) => Object.assign( memo, { [ division.id ]: this.factory.create( 'division', { model: { value: { data: division } }, insertion: { value: { el: this.els.divisions } } } ) } ),
            { }
        )

        this.Byops.data.forEach( byop => this.divisions[ byop.divisionId ].addTeam( byop ) )

        Object.keys( this.divisions ).forEach( divisionId => this.divisions[ divisionId ].notifyIfEmpty() )
    }
} )
