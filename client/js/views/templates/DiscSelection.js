module.exports = ( { disc, meta, total } ) => {
    const weights = meta.weightClasses.map( klass => `<li>${klass.min}-${klass.max}: ${klass.count}</li>` ).join(''),
        unknowns = meta.unknowns.map( unknown => `<li>${unknown}</li>` ).join('')
return `` +
`<div>
    <div>${disc}: ${total}</div>
    <ol>${weights}</ol>
    <div>Unknowns</div>
    <ul>${unknowns}</ul> 
</div>`
}
