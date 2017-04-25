module.exports = ( { model } ) => {
const spans = model.map( item => `<li><span data-js="item">${item}</span></li>` ).join('')
return `<nav>
    <ul class="nav">
        <li>${require('./lib/logoWhite')('logo')}</li>
        <li><ul class="spans">${spans}</ul></li>
        <li>${require('./lib/profile')('profile')}</li>
    </ul>
</nav>`
}
