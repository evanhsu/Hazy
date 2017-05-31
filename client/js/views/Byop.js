module.exports = Object.assign( {}, require('./__proto__'), {

    Divisions: Object.create( require('../models/__proto__'), { resource: { value: 'division' } } ),

    Templates: {
        PaidCash: require('./templates/PaidCash')
    },

    addDivisions() {
        this.Divisions.data.forEach( division => this.slurpTemplate( { template: `<option value="${division.id}">${division.label}</option>`, insertion: { el: this.els.division } } ) )
    },

    model: Object.create( require('../models/Byop') ),

    events: {
        submitBtn: 'click'
    },

    onSubmitBtnClick() {
        if( this.submitting ) return

        this.submitting = true

        this.validate()
        .then( result => {
            if( !result ) return Promise.resolve( this.submitting = false )

            return this.submit()
        } )
        .then( () => {
            this.isSubmitting = false
            return this.Toast.showMessage( 'success', 'All signed Up' )
            .then( () => this.emit( 'navigate', '/byop-players' ) )
        } )
        .catch( e => { this.Error(e); this.submitting = false } )
    },

    postRender() {
        this.els.container.querySelectorAll('input, select').forEach( el => el.addEventListener( 'focus', e => e.target.classList.remove('error') ) )

        this.Divisions.get()
        .then( () => this.addDivisions() )
        .catch( e => this.Error() )

        if( this.user.roles.includes('admin') ) this.slurpTemplate( { template: this.Templates.PaidCash(), insertion: { el: this.els.payment } } )

        return this
    },

    submit() {
        return this.model.post()
        .catch( e => { this.Toast.showMessage( 'error', e.message ); this.submitting = false } )
    },

    validate() {
        let rv = true;

        Object.keys( this.els ).forEach( attr => {        
            const el = this.els[ attr ]

            if( el.tagName !== "INPUT" && el.tagName !== "SELECT" ) return

            if( rv === true && !this.model.validate( attr, el.value ) ) {
                this.Toast.showMessage( 'error', this.model.meta[ attr ].error || `${attr} required` )
                el.scrollIntoView( { behavior: 'smooth' } )
                el.classList.add( 'error' )
                rv = false
            } else if( this.model.validate( attr, el.value ) ) {
                this.model.data[ attr ] = el.value
            }
        } )

        return Promise.resolve( rv )
    }

} )
