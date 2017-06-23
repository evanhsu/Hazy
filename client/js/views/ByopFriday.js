module.exports = Object.assign( {}, require('./__proto__'), {

    model: Object.create( require('../models/ByopFriday') ),

    Templates: {
        PaidCash: require('./templates/PaidCash')
    },

    clear() {
        this.els.name.value = ''
        this.els.shirtSize.value = 'null'
        this.els.email.value = ''
        this.els.phone.value = ''
        this.els.belmontDonation.value = ''
        this.els.ccName.value = ''
        this.els.ccNo.value = ''
        this.els.ccMonth.value = 'null'
        this.els.ccYear.value = 'null'
        this.els.cvc.value = ''
        this.updateTotal()
    },

    disablePayment() {
        this.els.payment.classList.add('disabled')
        this.els.payment.querySelectorAll('input, select').forEach( el => {
            if( !el.isEqualNode( this.els.paidCash ) ) el.setAttribute( 'disabled', 'true' )
        } )

        if( this.waitList === true && this.user.data.roles.includes('admin') ) this.els.paidCash.setAttribute( 'disabled', 'true' )
    },

    enablePayment() {
        this.els.payment.classList.remove('disabled')
        this.els.payment.querySelectorAll('input, select').forEach( el => el.removeAttribute( 'disabled' ) )
        if( this.els.paidCash ) this.els.paidCash.removeAttribute('disabled')
    },

    events: {
        belmontDonation: 'input',
        paidCash: 'change',
        playerPack: 'click',
        playersPageLink: 'click',
        submitBtn: 'click',
    },

    onBelmontDonationInput() { this.updateTotal() },

    onPaidCashChange() {
        this.els.paidCash.checked
            ? this.disablePayment()
            : this.enablePayment()

        this.updateTotal()
    },

    onPlayerPackClick() {
        this.updateTotal()

        this.els.playerPack.checked
            ? this.els.shirtSize.removeAttribute( 'disabled' )
            : this.els.shirtSize.setAttribute( 'disabled', 'true' )
    },

    onPlayersPageLinkClick() {
        this.emit( 'navigate', '/byop-players-friday' )
    },

    onSubmitBtnClick() {
        if( this.submitting ) return

        this.onSubmitStart()

        this.validate()
        .then( result => {
            if( !result ) return Promise.resolve( this.onSubmitEnd() )

            return this.model.post()
            .then( response => {
                return this.Toast.showMessage( 'success', response.message )
                .then( () => {
                    this.emit( 'navigate', '/byop-players-friday' )
                    this.onSubmitEnd()
                    this.clear()
                } )
            } )
            .catch( e => {
                this.Toast.showMessage( 'error', e && e.message ? e.message : `There was a problem.  Please try again or contact us.` );
                this.onSubmitEnd()
            } )
        } )
        .catch( e => { this.Error(e); this.submitting = false } )
    },

    onSubmitEnd() {
        this.submitting = false
        this.els.submitBtn.classList.remove('submitting')
    },
    
    onSubmitStart() {
        this.submitting = true
        this.els.submitBtn.classList.add('submitting')
    },

    postRender() {

        this.model.on( 'totalChanged', () => this.els.total.textContent = this.Format.Currency.format( this.model.git('total') ) )
        this.els.container.querySelectorAll('input, select').forEach( el => el.addEventListener( 'focus', e => e.target.classList.remove('error') ) )

        if( this.user.data.roles.includes('admin') ) {
            this.slurpTemplate( { template: this.Templates.PaidCash(), insertion: { method: 'insertBefore', el: this.els.totalWrap } } )
        }

        return this
    },

    updateTotal() {
        let total = this.model.meta.basePrice

        if( this.els.playerPack.checked ) total = 33.5

        if( this.els.paidCash && this.els.paidCash.checked ) total -= 3.5

        const belmontDonation = window.parseFloat( this.els.belmontDonation.value ) 
        if( !window.isNaN( belmontDonation ) && belmontDonation > 0 ) total += belmontDonation

        this.model.set( 'total', total )
    },

    validate() {
        let rv = true;

        Object.keys( this.els ).forEach( attr => {        
            const el = this.els[ attr ]
            
            if( el.tagName !== "INPUT" && el.tagName !== "SELECT" ) return

            if( ( this.waitList === true || ( this.els.paidCash && this.els.paidCash.checked ) ) && [ 'ccName', 'ccNo', 'ccMonth', 'ccYear', 'cvc'  ].includes( attr ) ) return

            if( rv === true && !this.model.validate( attr, el.value ) ) {
                this.Toast.showMessage( 'error', this.model.meta[ attr ].error || `${attr} required` )
                el.scrollIntoView( { behavior: 'smooth' } )
                el.classList.add( 'error' )
                rv = false
            } else if( this.model.validate( attr, el.value ) ) {
                this.model.data[ attr ] = attr === "paidCash"
                    ? Boolean( el.checked )
                    : el.value
            }
        } )

        return Promise.resolve( rv )
    }

} )
