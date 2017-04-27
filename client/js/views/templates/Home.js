module.exports = p => 
`<div>
    <img src="/static/img/behind-basket.jpg"/>
    <div class="intro side-by-side">
        ${require('./lib/logoWhite')()}
        <div>
            <h3>Taking Disc Golf to a Whole New Level</h3>
            <p>At Hazy Shade, disc golf is more than just a game...it's an obsession.  That's why since 2002, we've supplied the Miami Valley with the latest in disc golf gear and technology.</p>
            <p>We also sponsor a number of tournaments and outings thoughout the year.  Become a Hazy Shader today to get the scoop on all the latest disc golf action!</p>
        </div>        
    </div>
    <div class="side-by-side">
        <div class="featured-product">
            <span>Featured Item #1</span>
            <img src="/static/img/basket-close.jpg" />
        </div>
        <div class="featured-product">
            <span>Featured Item #2</span>
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
    <div class="side-by-side">
        <div class="ez-finder">
            <span>E-Z Finder</span>
            <svg>
                <circle cx="115" cy="115" r="110"></circle>
                <path d="M115,115 L115,5 A110,110 1 0,1 190,35 z"></path>
                <text>Hazy E-Z Finder</text>
                <text>An enlightened search experience awaits you</text>
            </svg>
        </div>
        <div class="featured-product">
            <span>Featured Item #3</span>
            <img src="/static/img/basket-close.jpg" />
        </div>
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
