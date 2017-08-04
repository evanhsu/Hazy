module.exports = ( { opts={} } ) =>
`<section>
    <ol data-js="list"></ol>
    ${opts.reset ? `<button data-js="resetBtn">Reset</button>` : ``}
    ${opts.save ? `<button data-js="saveBtn">Save</button>` : ``}
</section>`
