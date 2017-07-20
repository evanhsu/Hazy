module.exports = ( { opts={placeholder:''} } ) =>
`<div>
    <input data-js="input" placeholder="${opts.placeholder}" "type="text">
    ${require('./lib/search')()}
</div>`
