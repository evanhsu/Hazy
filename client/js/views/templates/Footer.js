module.exports = p =>
`<footer>
    <div>${require('./lib/logoWhite')()}</div>
    <div>
        <div class="clearfix">
            <div class="contact">
                <div>Hazy Shade Disc Golf</div>
                <div>723 Watervliet Ave</div>
                <div>Dayton, OH 45420</div>
                <hr/>
                <div>2113 Park Rd</div>
                <div>Springfield, OH 45504</div>
                <div>937.681.9521</div>
                <div>sales@hazyshade.com</div>
                <div>Mon - Sat 11am - 8pm</div>
                <div>Sun 12pm - 7pm</div>
                <a href="https://www.facebook.com/Hazy-Shade-Disc-Golf-And-More-173084619405424" target="_blank">${require('./lib/facebook')()}</a>
            </div>
    </div>
</footer>`
