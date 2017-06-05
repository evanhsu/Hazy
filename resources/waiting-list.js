module.exports = Object.assign( { }, require('./__proto__'), {

    GET() {
        return this.Postgres.query( `SELECT name1, name2 FROM byop WHERE "waitList" = true ORDER BY created` )
        .then( results => this.respond( { body: results } ) )
    }
} )
