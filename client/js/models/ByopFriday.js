module.exports = Object.assign( {}, require('./__proto__'), {

    attributes: {
        name: {
            label: 'Name',
            type: 'text',
        },

        shirtSize: {
            label: 'Shirt Size',
            type: 'select',
            range: 'shirtSizes'
        },

        email: {
            label: 'Email',
            type: 'email',
            range: 'email'
        },
    
        phone: {
            label: 'Phone',
            type: 'phone',
            range: 'phone'
        }
        
    },

    data: {
        total: 8.5
    },

    meta: {

        basePrice: 8.5,
 
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

        name: {
            type: 'text',
            error: 'name required'
        },

        shirtSize: {
            type: 'select',
            error: 'shirt size required'
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

    resource: 'byopFriday',

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
