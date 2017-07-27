module.exports = Object.assign( { }, require('./__proto__'), {

    Views: {

        Literal() {
            return {
                model: { data: this.model.data.value, meta: { editable: this.model.isEditable( this.model.data.key ) } }
            }
        },

        buttonFlow: {
            model: {
                data: {
                    states: { 
                        start: [
                            { name: 'delete', svg: require('./templates/lib/garbage')( { name: 'delete' } ), nextState: 'confirmDelete' }
                        ],
                        confirmDelete: [
                            { name: 'doDelete', class: 'link', text: 'Delete Property?', emit: true, nextState: 'start' },
                            { name: 'cancel', svg: require('./templates/lib/ex')( { name: 'cancel' } ), nextState: 'start' }
                        ]
                    }
                }
            }
        }

    },

    getTemplateOptions() {
        return {
            viewName: Array.isArray( this.model.data.value )
                ? 'Array'
                : typeof this.model.data.value === 'object'
                    ? 'Json'
                    : 'Literal',

            isEditable: this.model.isEditable( this.model.data.key ),

            model: this.model.data
        }
    },

    postRender() {
        this.views.buttonFlow.on( 'doDeleteClicked', this.delete.bind(this) )

        return this
    }

} )

