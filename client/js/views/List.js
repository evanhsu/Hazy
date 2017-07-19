module.exports = Object.assign( { }, require('./__proto__'), {

    populateList() {
        this.slurpTemplate( {
            template: this.model.data.map( datum => this.itemTemplate( datum ) ).join(''),
            insertion: { el: this.els.list }
        } )
        this.renderSubviews()
    },

    postRender() {
        this.currentSkip = 0

        this.model.get( { query: { skip: this.currentSkip, limit: this.pageSize, sort: this.sort } } )
        .then( () => this.populateList() )
        .catch( this.Error )

        return this
    },
} )
