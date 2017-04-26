module.exports = p => 
`<div>
    <img src="/static/img/behind-basket.jpg"/>
    <div class="intro">
        ${require('./lib/logoWhite')()}
        <div>
            <h3>Taking Disc Golf to a Whole New Level</h3>
            <p>At Hazy Shade, disc golf is more than just a game...it's an obsession.  That's why since 2002, we've supplied the Miami Valley with the latest in disc golf gear and technology.</p>A
            <p>We also sponsor a number of tournaments and outings thoughout the year.  Become a Hazy Shader today to get the scoop on all the latest disc golf action!</p>
        </div>        
    </div>
    <div class="featured-products">
        <div>
            <span>Feature Item #1</span>
            <img src="/static/img/basket-close.jpg" />
        </div>
        <div>
            <span>Feature Item #2</span>
            <img src="/static/img/basket-close.jpg" />
        </div>
    </div>
    <div class="disc-doctor">
        <div class="main">
            <div>${require('./lib/logoWhite')()}</div>
            <div>Disc Doctor</div>
        </div>
        <div class="subtitle">New to the sport?  Find the perfect disc with out interactive guide</div>
    </div>
    <div>
    </div>
    <div class="featured-event">
        <div>Join us for the 10th Annual</div>
        <div>BYOP</div>
        <div>Belmont Park / Dayton / August 23-24, 2017</div>
    </div>
    <div class="suppliers">
        <div>We are proud to carry the best names in disc golf</div>
        <div>Logos</div>
    </div>
</div>`
