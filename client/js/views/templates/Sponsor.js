module.exports = ( p, ImageSrc ) =>
`<div class="sponsor">
    <a href="${p["organization.uri"]}" target="_blank">
        <label>${p["byopSponsor.year"]}</label>
        <img src="${ ImageSrc( p['organization.name'] ) }.jpg"" />
    </a>
</div>`
