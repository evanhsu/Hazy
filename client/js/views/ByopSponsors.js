module.exports = Object.assign( { }, require('./__proto__'), {

    Sponsor: require('./templates/Sponsor'),

    Sponsors: Object.create( require('../models/__proto__'), { resource: { value: 'byopSponsor' } } ),

    postRender() {

        this.Sponsors.get( { query: { organizationId: { operation: 'join', value: { table: 'organization', column: 'id' } } } } )
        .then( () => this.shuffleArray( this.Sponsors.data ).forEach( datum =>
            this.slurpTemplate( { template: this.Sponsor( datum, this.Format.ImageSrc ), insertion: { el: this.els.sponsors } } )
        ) )
        .catch( this.Error )

        return this
    },
} )
