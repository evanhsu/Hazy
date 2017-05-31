module.exports = Object.assign( {}, require('./__proto__'), {

    data: {
        total: 123.5
    },

    meta: {
 
        aceOptions:[
            { value: 'true', label: 'Yes!' },
            { value: 'false', label: 'Not right now' }
        ],

        discs: [
            { value: 'luster-gator', label: 'Luster Gator (173g-175g)' },
            { value: 'star-roc', label: 'Star Roc (178g-180g)' },
            { value: 'star-destroyer', label: 'Star Destroyer (151g-175g)' },
            { value: 'champion-thunderbird', label: 'Champion Thunderbird (165g-175g)' },
            { value: 'champion-leopard-three', label: 'Champion Leopard 3 (165g-175g)' },
            { value: 'champion-flattop-firebird', label: 'Champion Flattop Firebird (165g-175g)' }
        ],

        shirtSizes: [
            { value: 'f-sx', label: 'Female X-Small' },
            { value: 'f-s', label: 'Female Small' },
            { value: 'f-m', label: 'Female Medium' },
            { value: 'f-l', label: 'Female Large' },
            { value: 'f-xl', label: 'Female X-Large' },
            { value: 'f-xxl', label: 'Female XX-Large' },
            { value: 'm-s', label: 'Male Small' },
            { value: 'm-m', label: 'Male Medium' },
            { value: 'm-l', label: 'Male Large' },
            { value: 'm-xl', label: 'Male X-Large' },
            { value: 'm-xxl', label: 'Male XX-Large' },
            { value: 'm-xxxl', label: 'Male XXX-Large' },
            { value: 'm-xxxxl', label: 'Male XXXX-Large' }
        ],

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

        'cvc': {
            type: 'text',
            error: 'A credit card cvc is required'
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
