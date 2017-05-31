module.exports = Object.assign( { }, require('./__proto__'), {

    GET() {
        this.getQs()

        const division = this.Postgres.divisions.store.id[ this.query.divisionId ]

        if( !division ) return this.badRequest()

        return Reflect.apply( this.Common.spotsTaken, this, [ this.Postgres.divisions.store.id[ this.query.divisionId ].name ] )
        .then( count => this.respond( { body: { spotsLeft: 108 - count } } ) )
    }
} )
