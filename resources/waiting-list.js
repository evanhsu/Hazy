module.exports = Object.assign( { }, require('./__proto__'), {

    GET() {
        let query = `SELECT id, "divisionId", name1, name2 FROM byop WHERE "waitList" = true AND "removedFromEvent" = false ORDER BY created`

        this.getQs()

        if( this.query.day === 'friday' ) query = `SELECT name FROM "byopFriday" WHERE "waitList" = true ORDER BY created`

        return this.Postgres.query( query )
        .then( results => this.respond( { body: results } ) )
    }
} )
