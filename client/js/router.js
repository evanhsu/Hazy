module.exports = Object.create( {

    Error: require('../../lib/MyError'),
    
    ViewFactory: require('./factory/View'),
    
    Views: require('./.ViewMap'),

    User: require('./models/User'),

    initialize() {

        this.contentContainer = document.querySelector('#content')

        window.onpopstate = this.handle.bind(this)

        this.User.on( 'logout', () =>
            Promise.all( Object.keys( this.views ).map( view => this.views[ view ].delete() ) )
            .then( () => this.handle() )
            .catch( this.Error )
        )

        this.handle()
    },

    handle() {
        this.handler( window.location.pathname.split('/').slice(1) )
    },

    handler( path ) {
        const view = this.Views[ path[0] ] ? path[0] : 'home'

        if( view === this.currentView ) return this.views[ view ].onNavigation( path )

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
                    .on( 'navigate', route => this.navigate( route ) )
                    .on( 'deleted', () => delete this.views[ view ] )
            )
        } )
        .catch( this.Error )
    },

    navigate( location ) {
        if( location !== window.location.pathname ) history.pushState( {}, '', location )
        this.handle()
    }

}, { currentView: { value: '', writable: true }, views: { value: { } } } )
