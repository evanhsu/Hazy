module.exports = {

    Currency: new Intl.NumberFormat( 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    } ),

    GetSelectOptions( options=[] ) {
        return options.map( option => `<option value="${option.value}">${option.label}</option>` ).join('')
    },

    ImageSrc( name ) { return `https://storage.googleapis.com/mega-poetry-9665/${name}` },
    
    Range( int ) {
        return Array.from( Array( int ).keys() )
    }
}
