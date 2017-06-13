module.exports = Object.assign( { }, require('./__proto__'), {

    Byop: Object.create( require('../models/Byop') ),
    
    Divisions: Object.create( require('../models/__proto__'), { resource: { value: 'division' } } ),

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

    addChange( name ) {
        this.slurpTemplate( {
            template: `<div data-name="${name}">${this.getChangeText( name )}</div>`,
            insertion: { el: this.els.changes }
        } )
        this.changes[ name ] = true
    },

    addDivisions() {
        this.Divisions.data.forEach( division => this.slurpTemplate( { template: `<option value="${division.id}">${division.label}</option>`, insertion: { el: this.els.divisionId } } ) )

        return Promise.resolve()
    },

    reset() {
        this.changes = { }
        while( this.els.changes.firstChild ) this.els.changes.removeChild( this.els.changes.firstChild )
        this.populateByopForm()
        this.updateByopButtons()
    },

    getChangeText( name ) {
        const from = this.Byop.attributes[ name ].type === 'select'
            ? this.els[ name ].querySelector( `option[value="${this.Byop.data[ name ]}"]` ).innerText
            : this.Byop.data[ name ]

        const to = this.Byop.attributes[ name ].type === 'select'
            ? this.els[ name ].querySelector( `option[value="${this.els[ name ].value}"]` ).innerText
            : this.els[ name ].value

        return `${this.Byop.attributes[ name ].label} changed from ${from} to ${to}.`
    },

    populateByopForm() {
        Object.keys( this.Byop.data ).forEach( attr => {
            const el = this.els[ attr ]

            if( !el ) return

            el.value = this.Byop.data[ attr ]

            el.classList.remove('changed')
        } )
        
        this.showEl( this.els.selectedTeam ).catch( e => this.Error )
    },

    postRender() {

        this.changes = { }

        this.Divisions.get()
        .then( () => this.addDivisions() )
        .catch( e => this.Error(e) )
        
        this.views.typeAhead.on( 'teamSelected', team => {
            this.Byop.data = team
            this.reset()
        } )

        this.views.byopTeamEdit.on( 'cancelUpdateClicked', () => this.reset() )

        this.$( this.els.selectedTeam, 'input,select' ).forEach( el => el.addEventListener( 'blur', e => this.onByopInputBlur( e ) ) )
        return this
    },

    onByopInputBlur( e ) {
        const el = e.target,
            name = el.getAttribute('data-name'),
            modelValue = this.Byop.data[ name ],
            hasChanged = Boolean( ( typeof modelValue === 'string' ? modelValue.trim() : modelValue ) != el.value.trim() )
       
        el.classList.toggle( 'changed', hasChanged )

        if( hasChanged && this.changes[ name ] === undefined ) this.addChange( name )
        else if( hasChanged && this.changes[ name ] !== undefined ) this.updateChange( name )
        else if( !hasChanged && this.changes[ name ] !== undefined ) this.removeChange( name )

        this.updateByopButtons()
    },
     
    requiresRole: 'superuser',

    removeChange( name ) {
        this.els.changes.removeChild( this.els.changes.querySelector( `div[data-name="${name}"]` ) )
        delete this.changes[ name ]
    },

    templateOptions() {
        return { byopAttributes: this.Byop.attributes, byopKeys: Object.keys( this.Byop.attributes ), byopMeta: this.Byop.meta }
    },

    updateByopButtons() {
        this.views.byopTeamEdit[ Object.keys( this.changes ).length ? 'enable' : 'disable' ]()
    },

    updateChange( name ) {
        this.els.changes.querySelector( `div[data-name="${name}"]` ).textContent = this.getChangeText( name )
        this.changes[ name ] = true
        
    }
    
} )
