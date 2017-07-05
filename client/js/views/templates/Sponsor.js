module.exports = ( p, ImageSrc ) =>
`<div class="sponsor">
    <a href="${p['organization.uri']}" target="_blank">
        <!--<label>${p["organization.label"]}</label>-->
        <img src="${ ImageSrc( p['organization.name'] ) }.jpg" />
    </a>
</div>`
