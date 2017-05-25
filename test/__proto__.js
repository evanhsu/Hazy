module.exports = Object.assign( {}, require('../lib/MyObject'), {

    Auth: require('./lib/Auth'),

    Bcrypt: require('bcrypt'),

    Chai: require('chai'),
    
    ColumnFixture: require('./lib/ColumnFixture'),

    Enum: require('../lib/Enum'),

    Jwt: require('../resources/lib/Jwt'),
    
    Mocha: require('mocha'),

    Model: require('./lib/Model'),

    Postgres: require('../dal/Postgres'),

    Request: require('./lib/Request'),
    
    Resource: require('./lib/Resource'),

    RowFixture: require('./lib/RowFixture'),

    clearDb() {
        return this.Postgres.truncate()
    },

    closeServer() {
        return this.P( this.server.close, [ ], this.server )
    },

    createServer() {
        const Router = require('../router')

        return Router.initialize()
        .then( () => Promise.resolve(
            this.server = require('http').createServer( Router.handler.bind(Router) ).listen( process.env.HTTP_PORT || process.env.PORT )
        ) )
    }

} )
