module.exports = Object.assign( { }, require('./__proto__'), {

    Bcrypt: require('bcrypt'),

    attachUserRoles( user ) {
        return this.Postgres.query( { query: "SELECT r.name AS name FROM role r JOIN membership m ON m.roleid = r.id WHERE m.personid = $1;", values: [ user.id ] } )
            .then( rows => Promise.resolve( Object.assign( user, { roles: rows.map( row => row.name ) } ) ) )
    },

    apply( method ) {
        return this.slurpBody()
        .then( () => this.Postgres.query( `SELECT * FROM person WHERE email = $1`, [ this.body.email ] ) )
        .then( result => {
            if( result.rows.length !== 1 ) return this.authError('Invalid Credentials')
            
            const row = result.rows[0]
            const password = row.password
            delete row.password

            return this.P( this.Bcrypt.compare, [ this.body.password, password ] )
            .then( ( [ checkedOut ] ) =>
                checkedOut
                    ? this.attachRoles( row ).then( user => this.Jwt.makeToken( user ) )
                    : this.authError('Invalid Credentials')
            )
            .then( token =>
                this.respond( {
                    body: {},
                    headers: {
                        'Set-Cookie': `${process.env.COOKIE}=${token}; Expires=${new Date("3030-03-30").toUTCString()}`
                    }
                } )
            )
        } )
    },

    authError( error ) { return this.respond( { stopChain: true, body: { message: error }, code: 500 } ) },

} )
