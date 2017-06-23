module.exports = ( { model, meta, Currency } ) => {
    const selectCaret = require('./lib/caret-down')( { name: 'caret' } )
    const shirts = meta.shirtSizes.map( ss => `<option value="${ss.value}">${ss.label}</option>` ).join('')
    return `` +
`<section>
    <div class="featured-event">
    <img src="/static/img/belmont-circle.jpg"/>
    <div class="content">
        <div class="center">BYOP - Friday Preview</div>
    </div>
  </div>
  <div class="event-info">
      <section class="important-info">
          <h4>Join us for the Belmont West preview round and Players Party at Hazy Shade in Dayton</h4>
          <div>Sponsored by Innova</div>
          <div>
              <span>Belmont Park West, August 11th, 2017</span>
              <a href="/static/img/byop-map.pdf" target="_blank">Course Map</a>
          </div>
          <div>Hazy Shade in Dayton is located at 723 Watervliet Ave Dayton, OH 45420</div>
      </section>
      <ul class="detailed-info">
        <li>
            <div>Preview Round</div>
            <p>For $5 you can play Belmont West all day. Or, for $30 you can get all day play PLUS an Innova Discs Players Pack.  The Friday Preview Round is a flex start and will not have a cap on players, but if you would like to receive a players pack you should pre-register. We will have a limited number of packs available the day of on a 1st come 1st served basis.  The preview round starts at 11am and continues until 6pm.</p>
        </li>
        <li>
            <div>Players Party</div>
            <p>Don't miss our Friday Night Players Party! It's a chance to have a great time with fellow golfers and win prizes with raffle tickets included with registration.  Starts at 5.  Goes until 10.</p>
        </li>
        <li>
            <div>Players Pack</div>
            <p>Players will receive an Innova player's pack which includes a premium disc, a hat and shirt, a mini, AND a few other cool items that lie in secret. Players can pick up their players packs starting at noon Friday at Hazy Shade.</p>
        </li>
        <li>
            <div>Register Today!</div>
            <p>If you have any questions email us at sales@hazyshade.com.</p>
            <p>
                <span>See the</span>
                <span data-js="playersPageLink" class="link">BYOP Friday Players Page</span>
                <span>to see who is currently registered</span>
            </p>
        </li>
      </ul>
  </div>
  <div class="registration">
      <h3>Registration</h3>
      <div class="pack">
          <label><input data-js="playerPack" type="checkbox"><span>I WANT THE PLAYERS PACK.  GIVE ME THE PLAYERS PACK.</span></label>
      </div>
      <div class="sub-heading">Enter your information below.</div>
      <div class="players">
        <input data-js="name" type="text" placeholder="Name" />
        <div class="select-wrap">
            <select disabled="true" data-js="shirtSize">
                <option value="null">Shirt Size</option>${shirts}
            </select>${selectCaret}
        </div>
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
      <div data-js="totalWrap" class="total side-by-side">
          <span>Total:</span>
          <span data-js="total">${Currency.format(model.total)}</span>
      </div>
      <div>
          <button data-js="submitBtn" type="button">Submit</button>
      </div>
  </div>
</section>`
}
