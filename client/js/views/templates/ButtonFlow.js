module.exports = ( { model } ) => {
    const disabled = model.disabled ? 'disabled': ''
return `` +
`<section class="${model.hide ? 'hidden hide' : ''}">` +
Object.keys( model.states ).map( stateName =>
    `<div data-js="${stateName}" class="state ${stateName} ${stateName === 'start' ? '' : 'hidden hide'}">` +
    model.states[ stateName ].map( button =>
        button.svg
            ? button.svg
            : `<button class="${disabled} ${button.class || ''} "data-js="${button.name}">${button.text}</button>`
    ).join('') +
    `</div>`
).join('') +
`</section>`
}
