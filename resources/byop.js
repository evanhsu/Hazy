module.exports = Object.assign( { }, require('./__proto__'), {

    POST() {
        this.getUser()
        .then( () => this.slurpBody() )
        .then( () => this.validate() )
        } )
    },

    checkAvailability( day ) {
        const in = day === "sat" ? `IN` : `NOT IN`
        return this.Postgres.query(
            `SELECT count(*) FROM byop WHERE "divisionId" ${in} ( $1, $2 )`,
            [ this.Postgres.divisions.store.name[ 'rec' ].id, this.Postgres.divisions.store.name[ 'rec' ].id ]
        )
        .then( ( [ { count } ] ) => Promise.resolve( this.body.waitList = Boolean( count >= 108 ) ) )
    },

    validate() {
        this.division = this.Postgres.divisions.store.id[ this.body.divisionId ]

        if( ! this.division ) return this.respond( { stopChain: true, code: 500, message: 'Invalid Division' } )

        return ( this.division.name === 'rec' || this.division.name === 'int'
            ? this.checkAvailability( 'sat' )
            : this.checkAvailability( 'sun' )
        )
        .then( () => {
            
            if( (!this.user.roles.includes('admin')) && (!this.body.waitList) && ( !this.body.ccName || !this.body.ccNo ||
        } )
        return this.Postgres.query( `SELECT count(*) FROM byop WHERE "divisionId" 
        return Promise.resolve()
    }
} )
