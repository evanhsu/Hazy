module.exports = ( p ) =>
`<section>
    <h1 data-js="heading">The Numbers</h1>
    <div data-js="content" class="content hidden">
        <div>
            <label>Player's pack</label>
            <div class="players-pack" data-js="playerPack"></div>
        </div>
        <div>
            <label>Shirts</label>
            <div class="shirts" data-js="shirts"></div>
        </div>
        <div>
            <label>Belmont Donations</label>
            <div class="belmont-donation" data-js="belmontDonation"></div>
        </div>
        <div>
            <label>Payment Type</label>
            <div class="paid-type" data-js="paidType"></div>
        </div>
        <div>
            <label>Ace Fund</label>
            <div class="ace" data-js="aceFund"></div>
        </div>
        <div>
            <label>Downloads</label>
            <div>
                <button data-js="getAceSheet" class="link">Get Ace Fund Names</button>
                <button data-js="getAllNames" class="link">Get All Names</button>
            </div>
        </div>
    </div>
</section>`
