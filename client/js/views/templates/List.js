module.exports = ( { opts={} } ) => {
    const goBack = opts.goBack
        ? `<button data-js="goBackBtn">${require('./lib/leftArrow')()}<span>${opts.goBack}</span></button>`
        : ``

return `` +
`<section>
    <div class="heading">
        ${goBack}
        <h3>${opts.heading}</h3>
    </div>
    <ol data-js="list"></ol>
    ${opts.reset ? `<button class="floating" data-js="resetBtn">Reset</button>` : ``}
    ${opts.save ? `<button class="floating" data-js="saveBtn">Save</button>` : ``}
</section>`
}
