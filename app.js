require('node-env-file')( __dirname + '/.env' )

const Fs = require('fs'),
    router = require('./router')

require('http').createServer( router ).listen( process.env.HTTP_PORT || 80 )

require('https').createServer(
    { key: Fs.readFileSync( process.env.SSLKEY ), cert: Fs.readFileSync( process.env.SSLCERT ) },
    require('./router')
).listen( process.env.HTTPS_PORT || 443 )

/*
require('./dal/Postgres').initialize()
.then( () => {
    console.log('DAL cached')

    require('./wsApp').constructor (
    require('http').createServer( require('./router') ).listen( process.env.PORT || 80 )
    )

    console.log( `An http server is running at port ${process.env.PORT || 80}` )
    return Promise.resolve()
} )
.catch( e => console.log( `Error starting server: ${e.stack || e} ` ) )
*/
