require('node-env-file')( __dirname + '/.env' )

const Fs = require('fs'),
    Router = require('./router'),
    httpPort = process.env.HTTP_PORT || 80,
    httpsPort = process.env.HTTPS_PORT || 443

module.exports = Router.initialize()
.then( () => {

    require('http').createServer( Router.handler.bind(Router) ).listen( httpPort )

    console.log( `HTTP server listening at ${httpPort}` )

    return Promise.resolve()
} )
.catch( e => console.log( `Error initializing app: ${e.stack ||e}` ) )
