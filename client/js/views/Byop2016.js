module.exports = Object.assign( {}, require('./__proto__'), {

    Byops: Object.create( require('../models/__proto__'), { resource: { value: 'byop2016Results' } } ),

    TournamentResult: require('./templates/TournamentResult'),

    postRender() {

        this.Byops.get()
        .then( () =>
            this.Byops.data.sort( ( a, b ) => {
                const aTotal = window.parseInt( a.total ),
                    bTotal = window.parseInt( b.total )
                    
                return window.isNaN( aTotal )
                    ? 1
                    : window.isNaN( bTotal )
                        ? -1
                        : aTotal - b.Total
            } )
            .forEach( byop => {
                if( !byop.division ) return 
                
                this.slurpTemplate( { template: this.TournamentResult( byop ), insertion: { el: this.els[ byop.division.trim() ] } } )
            } )
        )
        .catch( e => this.Error(e) )

        return this
    }

} )
