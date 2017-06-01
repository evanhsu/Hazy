module.exports = ( { model } ) => {
//const spans = model.map( item => `<li><span data-js="item">${item}</span></li>` ).join('')
        //<li><ul class="spans">${spans}</ul></li>
        //<li>${require('./lib/profile')('profile')}</li>
return `<nav>
    <ul class="nav">
        <li>${require('./lib/logoWhite')( { name: 'logo' } )}</li>
    </ul>
</nav>`
}
