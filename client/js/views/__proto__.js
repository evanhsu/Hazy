module.exports = Object.assign( { }, require('../../../lib/MyObject'), require('events').EventEmitter.prototype, {

    $( el, selector ) { return Array.from( el.querySelectorAll( selector ) ) },

    Format: require('../Format'),

    Model: require('../models/__proto__'),

    OptimizedResize: require('./lib/OptimizedResize'),
    
    Xhr: require('../Xhr'),

    bindEvent( key, event, el ) {
        var els = el ? [ el ] : Array.isArray( this.els[ key ] ) ? this.els[ key ] : [ this.els[ key ] ]
        els.forEach( el => el.addEventListener( event || 'click', e => this[ `on${this.capitalizeFirstLetter(key)}${this.capitalizeFirstLetter(event)}` ]( e ) ) )
    },

    constructor() {

        this.subviewElements = [ ]

        if( this.requiresLogin && ( !this.user.isLoggedIn() ) ) return this.handleLogin()
        if( this.user && !this.isAllowed( this.user ) ) return this.scootAway()

        return this.initialize().render()
    },

    delegateEvents( key, el ) {
        var type = typeof this.events[key]

        if( type === "string" ) { this.bindEvent( key, this.events[key], el ) }
        else if( Array.isArray( this.events[key] ) ) {
            this.events[ key ].forEach( eventObj => this.bindEvent( key, eventObj ) )
        } else {
            this.bindEvent( key, this.events[key].event )
        }
    },

    delete() {
        return this.hide()
        .then( () => {
            this.els.container.parentNode.removeChild( this.els.container )
            return Promise.resolve( this.emit('deleted') )
        } )
    },

    events: {},

    getTemplateOptions() {
        const rv = Object.assign( this.user ? { user: this.user.data } : {},  this.Format )

        if( this.model ) {
            rv.model = this.model.data

            if( this.model.meta ) rv.meta = this.model.meta
        }

        if( this.templateOptions ) rv.opts = typeof this.templateOptions === 'function' ? this.templateOptions() : this.templateOptions

        return rv
    },

    handleLogin() {
        this.factory.create( 'login', { insertion: { value: { el: document.querySelector('#content') } } } )
            .on( "loggedIn", () => this.onLogin() )

        return this
    },

    hide() {
        if( !this.els || !document.body.contains(this.els.container) || this.isHidden() ) {
            return Promise.resolve()
        } else if( this.els.container.classList.contains('hide') ) {
            return new Promise( resolve => this.once( 'hidden', resolve ) )
        } else {
            return new Promise( resolve => {
                this.onHiddenProxy = e => this.onHidden(resolve)
                this.els.container.addEventListener( 'transitionend', this.onHiddenProxy )
                this.els.container.classList.add('hide')
            } )
        }
    },

    _hideEl( el, resolve, hash ) {
        el.removeEventListener( 'transitionend', this[ hash ] )
        el.classList.add('hidden')
        delete this[hash]
        resolve()
    },

    hideEl(el) {
        const time = new Date().getTime(),
            hash = `${time}Hide`
        
        return new Promise( resolve => {
            this[ hash ] = e => this._hideEl( el, resolve, hash )
            el.addEventListener( 'transitionend', this[ hash ] )
            window.requestAnimationFrame( () => el.classList.add('hide') )
        } )
    },

    htmlToFragment( str ) {
        let range = document.createRange();
        // make the parent of the first div in the document becomes the context node
        range.selectNode(document.getElementsByTagName("div").item(0))
        return range.createContextualFragment( str )
    },

    initialize() {
        return Object.assign( this, { els: { }, slurp: { attr: 'data-js', view: 'data-view', name: 'data-name' }, views: { } } )
    },

    isAllowed( user ) {
        if( !this.requiresRole ) return true
        return this.requiresRole && user.data.roles.includes( this.requiresRole )
    },
    
    isHidden() { return this.els.container.classList.contains('hidden') },

    onHidden( resolve ) {
        this.els.container.removeEventListener( 'transitionend', this.onHiddenProxy )
        this.els.container.classList.add('hidden')
        resolve( this.emit('hidden') )
    },

    onLogin() {

        if( !this.isAllowed( this.user ) ) return this.scootAway()

        this.initialize().render()
    },

    onNavigation() {
        return this.show()
    },

    onShown( resolve ) {
        this.els.container.removeEventListener( 'transitionend', this.onShownProxy )
        if( this.size ) this.size()
        this.emit('shown')
        resolve( this.showing = false )
    },

    showNoAccess() {
        alert("No privileges, son")
        return this
    },

    postRender() { return this },

    render() {
        if( this.data ) this.model = Object.create( this.Model, { } ).constructor( this.data )

        this.slurpTemplate( { template: this.template( this.getTemplateOptions() ), insertion: this.insertion || { el: document.body }, isView: true } )

        this.renderSubviews()

        if( this.size ) { this.size(); this.OptimizedResize.add( this.size.bind(this) ) }

        return this.postRender()
    },

    renderSubviews() {
        this.subviewElements.forEach( obj => {
            const name = obj.name || obj.view

            let opts = { }

            if( this.Views && this.Views[ name ] ) opts = typeof this.Views[ name ] === "object" ? this.Views[ name ] : Reflect.apply( this.Views[ name ], this, [ ] )

            this.views[ name ] = this.factory.create( obj.view, Object.assign( { insertion: { value: { el: obj.el, method: 'insertBefore' } } }, opts ) )
            obj.el.remove()
        } )

        delete this.subviewElements

        return this
    },

    scootAway() {
        this.Toast.showMessage( 'error', 'You are not allowed here.')
        .catch( e => { this.Error( e ); this.emit( 'navigate', `/` ) } )
        .then( () => this.emit( 'navigate', `/` ) )

        return this
    },

    setupShow( resolve ) {
        this.onShownProxy = e => this.onShown(resolve)
        this.els.container.addEventListener( 'transitionend', this.onShownProxy )
        this.els.container.classList.remove( 'hide' )
    },

    show() {
        if( this.showing ) return new Promise( resolve => this.once( 'shown', resolve ) )

        const classList = this.els.container.classList,
              isHidden = classList.contains('hidden'),
              isHiding = classList.contains('hide')

        const resolution = ( !isHidden && !isHiding )
            ? resolve => resolve()
            : isHidden
                ? resolve =>
                    window.requestAnimationFrame( () => {
                        this.els.container.classList.remove( 'hidden' )
                        window.requestAnimationFrame( () => this.setupShow( resolve ) )
                    } )
                : isHiding
                    ? resolve => {
                        this.els.container.removeEventListener( 'transitionend', this.onHiddenProxy )
                        window.requestAnimationFrame( () => this.setupShow( resolve ) )
                    }
                    : resolve => resolve()

        return new Promise( resolution )
    },

    _showEl( el, resolve, hash ) {
        el.removeEventListener( 'transitionend', this[hash] )
        delete this[ hash ]
        resolve()
    },

    showEl(el) {

        return new Promise( resolve => {
            const time = new Date().getTime(),
                hash = `${time}Show`

            window.requestAnimationFrame( () => {
                el.classList.remove( 'hidden' )
                window.requestAnimationFrame( () => {
                    this[hash] = e => this_showEl( el, resolve, hash ) 
                    el.addEventListener( 'transitionend', this[hash] )
                    el.classList.remove( 'hide' )
                } )
            } )
        } )
    },

    slurpEl( el ) {
        var key = el.getAttribute( this.slurp.attr ) || 'container'

        if( key === 'container' ) el.classList.add( this.name )

        this.els[ key ] = Array.isArray( this.els[ key ] )
            ? this.els[ key ].concat( el )
            : ( this.els[ key ] !== undefined )
                ? [ this.els[ key ], el ]
                : el

        el.removeAttribute(this.slurp.attr)

        if( this.events[ key ] ) this.delegateEvents( key, el )
    },

    slurpTemplate( options ) {
        var fragment = this.htmlToFragment( options.template ),
            selector = `[${this.slurp.attr}]`,
            viewSelector = `[${this.slurp.view}]`,
            firstEl = fragment.querySelector('*')

        if( options.isView || firstEl.getAttribute( this.slurp.attr ) ) this.slurpEl( firstEl )
        Array.from( fragment.querySelectorAll( `${selector}, ${viewSelector}` ) ).forEach( el => {
            if( el.hasAttribute( this.slurp.attr ) ) { this.slurpEl( el ) }
            else if( el.hasAttribute( this.slurp.view ) ) {
                this.subviewElements.push( { el, view: el.getAttribute(this.slurp.view), name: el.getAttribute(this.slurp.name) } )
            }
        } )
          
        options.insertion.method === 'insertBefore'
            ? options.insertion.el.parentNode.insertBefore( fragment, options.insertion.el )
            : options.insertion.el[ options.insertion.method || 'appendChild' ]( fragment )

        return this
    }
} )
