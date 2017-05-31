module.exports = ( { meta, model, Currency, Range } ) =>  {
    const selectCaret = require('./lib/caret-down')( { name: 'caret' } )
    const shirts = meta.shirtSizes.map( ss => `<option value="${ss.value}">${ss.label}</option>` ).join('')
    const ace = meta.aceOptions.map( option => `<option value="${option.value}">${option.label}</option>` ).join('')
    const discs = meta.discs.map( option => `<option value="${option.value}">${option.label}</option>` ).join('')
    const playerFields = no =>
        `<div class="player">` +
            `<div>Player ${no}</div>` +
            `<input data-js="name${no}" type="text" placeholder="Name" />` + 
            `<div class="select-wrap">` +
                `<select data-js="shirtSize${no}">` +
                    `<option value="null">Shirt Size</option>` + shirts +
                `</select>${selectCaret}` +
            `</div>` +
            `<div class="select-wrap">` +
                `<select data-js="ace${no}">` +
                    `<option value="null">Ace Fund</option>` + ace +
                `</select>${selectCaret}` +
            `</div>` +
            `<div class="select-wrap">` +
                `<select data-js="disc{no}">` +
                    `<option value="null">Would like a...</option>` + discs +
                `</select>${selectCaret}` +
            `</div>` +
            `<input data-js="weight{no}" placeholder="My preferred weight is" />` +
        `</div>`
         
    return `` +
`<section>
  <div class="featured-event">
    <img src="/static/img/basket-sunrise.jpg"/>
    <div class="content">
        <div class="center">
            <div>Join us for the Hazy Shade 16th Annual BYOP Doubles Sponsored by Innova and Discmania at Belmont and Belmont West, August 11-13, 2017</div>
            <ol>
                <li>Friday August 11 -> Belmont West preview round and Players Party at Hazy Shade in Dayton</li>
                <li>Saturday August 12 -> Rec and Intermediate Divisions</li>
                <li>Sunday August 13 -> All remaining divisions</li>
            </ol>
            
        </div>
    </div>
  </div>
  <div class="registration">
      <ul class="main-info">
        <li>Player check-in and pack pick-up starts Friday, August 11th, noon at the Hazy Shade in Dayton. If you check in Friday, you do not need to check in Saturday or Sunday before the round. Players who have not checked-in on Friday can do so on the day of your division's event at 8am. A players meeting will be held the 12 and 13th at 9:15am with a 9:30 tee off. 2 rounds of best shot doubles. 1 at Belmont, and 1 at Belmont West.</li>
        <li>Don't miss Friday nights players party. It's a chance to have a great time, and win tickets in our raffles included with your entry.</li>
        <li>With help from our friends at Innova and Discmania all amateur divisions will receive an amazing players pack. Pro divisions will receive a reduced pack and cash payout.</li>
        <li>This event can hold 108 teams per day and normally sells out. If you have any questions email us at sales@hazyshade.com.</li>
      </ul>
      <h3>Registration</h3>
      <div class="sub-heading">Enter your information below.</div>
      <div class="info">Recreation and Intermediate divisions will play on August 12th.  All other divisions will play August 13th. There must be 3 teams to make a division. If you sign up for a division that is too small you will have the option to move to another division.</div>
      <div class="select-wrap division">
          <select data-js="division">
            <option value="null">Division</option>
          </select>
          ${selectCaret}
      </div>
      <div class="players">
          ${playerFields('1')}  
          ${playerFields('2')}
          <div class="info">$5 per player for entry into the ace fund. You can pass for now and still enter your team on the day of the event.</div>
          <div class="info">We will do our best to match disc weight requests but can not guarantee we can get exactly what you asked for.</div>
      </div>
      <div class="contact">
          <div>Contact</div>
          <div class="info">We will not release your info to anyone.  Contact information will only be used for us to reach you for purposes related to the BYOP event.</div>
          <input data-js="email" type="text" placeholder="Email" />
          <input data-js="phone" type="text" placeholder="Phone Number" />
      </div>
      <div class="donation">
          <div>Belmont Basket Donation</div>
          <div class="info">Consider making a donation to replace the baskets at belmont park.  Enter a dollar amount below.</div>
          <input data-js="belmontDonation" type="text" placeholder="5" />
      </div>
      <div data-js="payment" class="payment-info">
          <div>Payment Info</div>
          <div class="info">We only accept credit, debit cards for online registration.  A $3.50 fee will be added to the cost.  You can also pay in cash in one of our stores.</div>
          <input data-js="ccName" type="text" placeholder="Name on Card" />
          <input data-js="ccNo" type="text" placeholder="Number on Card" />
          <div class="exp-ccv">
            <div>
                <div>Expiration</div>
                <div>
                    <div class="exp">
                        <div class="select-wrap">
                            <select data-js="ccMonth">
                                <option value="null">MO</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            ${selectCaret}
                        </div>
                        <div class="select-wrap">
                            <select data-js="ccYear">
                                <option value="null">YR</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                            </select>
                            ${selectCaret}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>CVC</div>
                <input data-js="cvc" type="text" />
            </div>
          </div>
      </div>
      <div class="total side-by-side">
          <span>Total:</span>
          <span data-js="total">${Currency.format(model.total)}</span>
      </div>
      <div>
          <button data-js="submitBtn" type="button">Submit</button>
      </div>
  </div>
</section>`
}
