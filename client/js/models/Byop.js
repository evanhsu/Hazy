module.exports = Object.assign( {}, require('./__proto__'), {

    data: {
        total: 35
    },

    meta: {
        division: {
            type: 'select'
        },

        name1: {
            type: 'text',
            error: 'Player 1 name required'
        },

        shirtSize1: {
            type: 'select',
            error: 'Player 1 shirt size required'
        },

        name2: {
            type: 'text',
            error: 'Player 2 name required'
        },

        shirtSize2: {
            type: 'select',
            error: 'Player 2 shirt size required'
        },

        email: {
            type: 'email',
            error: 'A valid email address is required'
        },
    
        phone: {
            type: 'phone',
            error: 'A valid phone number is required'
        },

        ccName: {
            type: 'text',
            error: 'A credit card name is required'
        },
        
        ccNo: {
            type: 'text',
            error: 'A credit card number is required'
        },

        ccMonth: {
            type: 'select',
            error: 'A credit card month expiration is required'
        },
        
        ccYear: {
            type: 'select',
            error: 'A credit card year expiration is required'
        },

        'ccv': {
            type: 'text',
            error: 'A credit card ccv is required'
        }
    },

    resource: 'byop',

    validate( field, value ) {
        if( !this.meta[field] ) return true

        if( value === "null" && this.meta[ field ].type === "select" ) return false
        
        if( value.trim() === "" && this.meta[ field ].type === "text" ) return false

        if( this.meta[ field ].type === "email" && ( !this._emailRegex.test( value ) ) ) return false
        
        if( this.meta[ field ].type === "phone" && ( !this._phoneRegex.test( value ) ) ) return false

        return true
    },

    _emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

    _phoneRegex: /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/
} )
