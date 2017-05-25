const Request = Object.assign( { }, require('../../lib/MyObject'), {

    Http: require('http'),

    constructor() {
        return this.buildHttpOpts().request()
    },
    
    buildHttpOpts() {
        this.method = this.opts.method || 'GET'
        this.headers = Object.assign( { accept: 'application/json' }, this.opts.headers )
           
        if( /(PUT|POST|PATCH)/.test(this.method) ) {
            if( ! this.opts.contentType ) this.opts.body = JSON.stringify(this.opts.body)
            Object.assign( this.headers, {
                'Content-Type': this.opts.contentType || 'application/json',
                'Content-Length': this.opts.body ? this.opts.body.length : 0 } )
        }

        this.httpOpts = {
            agent: this.opts.agent,
            headers: this.headers,
            hostname: this.opts.hostname || undefined,
            method: this.method,
            path: this.opts.path,
            port: this.opts.port || process.env.PORT || process.env.HTTP_PORT || undefined,
        }

        return this
    },
    
    handleIncomingMessage( message, resolve, reject ) {
        let body = ''
        message.on( 'data', data => body += data )
        message.on( 'end', () => {
            try { body = body.length ? JSON.parse(body) : { } }
            catch(e) { return reject(e) }
            resolve( [ body, message ] )
        } )
        message.on( 'error', e => reject( e ) )
    },

    request() {
        return new Promise( ( resolve, reject ) => {
            const request = this.Http.request( this.httpOpts, message => this.handleIncomingMessage( message, resolve, reject ) )
            if( this.opts.body ) request.write(this.opts.body)
            request.end()
        } )
    }
} )

module.exports = opts => Object.create( Request, { opts: { value: opts } } ).constructor()
