module.exports = Object.create( {

    Error: require('../../lib/MyError'),
    
    ViewFactory: require('./factory/View'),
    
    Views: require('./.ViewMap'),

    Toast: require('./views/Toast'),

    User: require('./models/User'),

    capitalizeFirstLetter: string => string.charAt(0).toUpperCase() + string.slice(1),

    initialize() {

        this.contentContainer = document.querySelector('#content')

        this.Toast.constructor()

        window.onpopstate = this.handle.bind(this)

        this.User.on( 'logout', () =>
            Promise.all( Object.keys( this.views ).map( view => this.views[ view ].delete() ) )
            .then( () => { this.currentView = undefined; return this.handle() } )
            .catch( this.Error )
        )
        
        this.header =
            this.ViewFactory.create(
                'header',
                { insertion: { value: { el: this.contentContainer, method: 'insertBefore' } }, user: { value: this.User } }
            )
            .on( 'navigate', route => this.navigate( route ) )

        this.footer =
            this.ViewFactory.create(
                'footer',
                { insertion: { value: { el: document.body, method: 'appendChild' } }, user: { value: this.User } }
            )

        this.handle()
    },

    handle() {
        this.handler( window.location.pathname.split('/').slice(1) )
    },

    handler( path ) {
        const name = this.pathToView( path[0] )
        const view = this.Views[ name ] ? name : 'home'

        if( view === this.currentView ) return this.views[ view ].onNavigation( path.slice(1) )

        this.scrollToTop()

        Promise.all( Object.keys( this.views ).map( view => this.views[ view ].hide() ) )
        .then( () => {

            this.currentView = view

            if( this.views[ view ] ) return this.views[ view ].onNavigation( path )

            return Promise.resolve(
                this.views[ view ] =
                    this.ViewFactory.create( view, {
                        insertion: { value: { el: this.contentContainer } },
                        path: { value: path, writable: true }
                    } )
                    .on( 'navigate', ( route, options ) => this.navigate( route, options ) )
                    .on( 'deleted', () => delete this.views[ view ] )
            )
        } )
        .catch( this.Error )
    },

    navigate( location, options={} ) {
        if( location !== window.location.pathname ) history.pushState( {}, '', location )
        if( !options.silent ) this.handle()
    },

    pathToView( path ) {
        const hyphenSplit = path.split('-')
        return hyphenSplit.map( item => this.capitalizeFirstLetter( item ) ).join('')
    },

    scrollToTop() {
        window.scroll( { top: 0, left: 0, behavior: 'smooth' } )
    },

}, { currentView: { value: '', writable: true }, views: { value: { } } } )
