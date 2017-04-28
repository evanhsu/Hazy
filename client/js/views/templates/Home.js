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
            <span class="title">Featured Item #1</span>
            <img src="/static/img/basket-close.jpg" />
        </div>
        <div class="featured-product">
            <span class="title">Featured Item #2</span>
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
            <span class="title">E-Z Finder</span>
            <svg class="disc" viewBox="0 0 230 70">
                <defs>
                    <linearGradient id="MyGradient">
                        <stop offset="0%"  stop-color="#f38c3e"/>
                        <stop offset="100%" stop-color="#fee32a"/>
                    </linearGradient>
                    <path id="yourPath" d="M115,5 A110,110 1 0,1 115,225"></path>
                </defs>
                <path fill="url(#MyGradient)" d="M115,115 L115,5 A110,110 1 0,1 115,225 z" transform="rotate(270,115,115)"></path>
                <text class="curvedText" transform="rotate(270,115,115) translate(-20,0)">
                    <textPath startOffset="50%" xlink:href="#yourPath">Hazy E-Z Finder</textPath>
                </text>
            </svg>
            <span class="caption">An enlightened search experience awaits you...</span>
        </div>
        <div class="featured-product">
            <span class="title">Featured Item #3</span>
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
