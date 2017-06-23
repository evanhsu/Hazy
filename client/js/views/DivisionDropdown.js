module.exports = Object.assign( { }, require('./__proto__'), {

    Divisions: Object.create( require('../models/__proto__'), { resource: { value: 'division' } } ),

    addDivisions() {
        this.Divisions.data.forEach( division => this.slurpTemplate( { template: `<option value="${division.id}">${division.label}</option>`, insertion: { el: this.els.division } } ) )

        this.emit('added')

        return Promise.resolve()
    },

    events: {
        division: 'change'
    },

    getModel( id ) { return this.Divisions.store.id[ id ] },

    onDivisionChange() {
        this.emit( 'changed', this.Divisions.store.id[ this.els.division.value ] )
    },

    postRender() {

        this.Divisions.get( { storeBy: [ 'id' ] } )
        .then( () => this.addDivisions() )
        .catch( e => this.Error(e) )

        return this
    },

    select( id ) {
        this.els.division.value = id
    }
} )
