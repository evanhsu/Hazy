module.exports = ( { model } ) => {
    const disabled = model.disabled ? 'disabled': '',
        klass = model.hide ? 'hidden' : ''
return `` +
`<section class="${klass}">` +
Object.keys( model.states ).map( stateName =>
    `<div data-js="${stateName}" class="state ${stateName} ${stateName === 'start' ? '' : 'hidden'}">` +
    model.states[ stateName ].map( button =>
        button.svg
            ? button.svg
            : `<button class="${disabled} ${button.class || ''} "data-js="${button.name}">${button.text}</button>`
    ).join('') +
    `</div>`
).join('') +
`</section>`
}
