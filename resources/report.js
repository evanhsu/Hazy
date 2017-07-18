module.exports = Object.assign( { }, require('./__proto__'), {

    apply( method ) {
        if( method !== "GET" ) return this.badRequest()

        return this.GET()
    },

    GET() {
        return this.getUser()
        .then( () => {
            if( !this.user.roles.includes('superuser') ) return this.badRequest()

            this.getQs()
            this.response.writeHead( 200, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment;filename="${this.query.id}.csv"`
            } )

            return this.Postgres.stream( this._csvWrap( this._queries[ this.query.id ] ), this.response )
        } )
    },

    _queries: {
        byopAce: `( SELECT d.label as "Division", b.name1 as "Player" FROM byop b JOIN division d on b."divisionId" = d.id WHERE ace1 IS TRUE ) UNION
                  ( SELECT d.label as "Division", b.name2 as "Player" FROM byop b JOIN division d on b."divisionId" = d.id WHERE ace2 IS TRUE ) ORDER BY "Division"`,
        byopNames: `SELECT d.label as "Division", b.name1 as "Player 1", b.name2 as "Player 2" FROM byop b JOIN division d on b."divisionId" = d.id ORDER BY "Division"`
    },

    _csvWrap( query ) { return `COPY ( ${query} ) to STDOUT WITH CSV HEADER` }
} )
