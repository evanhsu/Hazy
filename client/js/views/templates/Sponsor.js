module.exports = p =>
`<div class="sponsor">
    <a href="${p["organization.uri"]}" target="_blank">
        <label>${p["byopSponsor.year"]}</label>
        <img src="/static/img/${p["organization.name"]}.jpg" />
    </a>
</div>`
