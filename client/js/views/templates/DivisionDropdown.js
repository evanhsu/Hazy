module.exports = p => {
    const selectCaret = require('./lib/caret-down')( { name: 'caret' } )
    return `` +
`<div class="select-wrap">
    <select data-js="division"></select>
    ${selectCaret}
</div>`
}
