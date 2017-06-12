module.exports = Object.assign( { }, require('./__proto__'), {

    Byop: Object.create( require('../models/Byop') ),

    Views: {

        byopTeamEdit: { model: { value: { data: {
            disabled: true,
            states: { 
                start: [
                    { name: 'updateByopTeam', class: '', text: 'Save', nextState: 'confirm' },
                    { name: 'cancelUpdate', class: '', text: 'Cancel', nextState: 'start', emit: true }
                ],
                confirm: [
                    { name: 'confirmUpdate', class: '', text: 'Are you Sure?', emit: true, nextState: 'start' },
                    { name: 'cancel', class: '', nextState: 'start', text: 'Cancel', emit: true }
                ]
            }
        } } } },

        typeAhead: {
            templateOptions: { value: { label: 'Search Byop 2017 by player name' } }
        }

    },

    populateByopForm( team ) {
        Object.keys( team ).forEach( attr => {
            const el = this.els[ attr ]

            if( !el ) return

            el.value = team[ attr ]
        } )
        
        this.Byop.data = team
        this.showEl( this.els.selectedTeam ).catch( e => this.Error )
    },

    postRender() {
        
        this.views.typeAhead.on( 'teamSelected', team => this.populateByopForm( team ) )

        this.$( this.els.selectedTeam, 'input,select' ).forEach( el => el.addEventListener( 'blur', e => this.onByopInputBlur( e ) ) )
        return this
    },

    onByopInputBlur( e ) {
        const el = e.target,
            hasChanged = Boolean( this.Byop.data[ el.getAttribute('data-name') ].trim() != el.value.trim() )
        
        el.classList.toggle( 'changed', hasChanged )

    },
     
    requiresRole: 'superuser',

    templateOptions() {
        return { byopAttributes: this.Byop.attributes, byopKeys: Object.keys( this.Byop.attributes ), byopMeta: this.Byop.meta }
    }
    
} )
