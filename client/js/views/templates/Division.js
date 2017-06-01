module.exports = ( { model } ) =>
`<div>
    <h4>${model.label}</h4>
    <h5 data-js="isEmpty" class="empty hide">No registered players.</h5>
    <ol data-js="players"></ol>
</div>`
