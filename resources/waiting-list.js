module.exports = Object.assign( { }, require('./__proto__'), {

    GET() {
        return this.Postgres.query( `SELECT id, "divisionId", name1, name2 FROM byop WHERE "waitList" = true AND "removedFromEvent" = false ORDER BY created` )
        .then( results => this.respond( { body: results } ) )
    }
} )
