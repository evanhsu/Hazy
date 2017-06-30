module.exports = p =>
`<div class="sponsor">
    <a href="${p["organization.uri"]}" target="_blank">
        <!--<label>${p["organization.label"]}</label>-->
        <img src="/static/img/${p["organization.name"]}.jpg" />
    </a>
</div>`
