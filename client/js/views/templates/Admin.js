module.exports = ( { user } ) =>
`<div>
    <div>Logged in as ${user.name || user.email}</div>
    <img src="/static/img/hazy-tree.svg"/>
    <button data-js="logout">Logout</button>
</div>`
