module.exports = { 
    
    Currency: new Intl.NumberFormat( 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    } ),

    Decimal: new Intl.NumberFormat( 'en-US', {
      style: 'decimal',
      currency: 'USD',
    } )

}
