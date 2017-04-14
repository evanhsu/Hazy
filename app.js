require('node-env-file')( __dirname + '/.env' )

const Fs = require('fs'),
    router = require('./router'),
    httpPort = process.env.HTTP_PORT || 80,
    httpsPort = process.env.HTTPS_PORT || 443

require('http').createServer( ( request, response ) => {
    response.writeHead( 301, { 'Location': `https://${process.env.DOMAIN}:${httpsPort}${request.url}` } )
    response.end("")
} ).listen( httpPort )

console.log( `HTTP server listening at ${httpPort}` )

require('https').createServer(
    { key: Fs.readFileSync( process.env.SSLKEY ), cert: Fs.readFileSync( process.env.SSLCERT ) },
    require('./router')
).listen( httpsPort )

console.log( `HTTPS server listening at ${httpsPort}` )
