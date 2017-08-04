module.exports = ( { opts={} } ) =>
`<section>
    <div class="heading">
        ${opts.goBack ? `<button data-js="goBackBtn">Reset</button>` : ``}
        <h3>opts.heading</h3>
    </div>
    <ol data-js="list"></ol>
    ${opts.reset ? `<button class="floating" data-js="resetBtn">Reset</button>` : ``}
    ${opts.save ? `<button class="floating" data-js="saveBtn">Save</button>` : ``}
</section>`
