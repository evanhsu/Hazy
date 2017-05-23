module.exports = ( { model, Currency, Range } ) =>  {
    const selectCaret = require('./lib/caret-down')( { name: 'caret' } )
    const weightOptions = Range( 26 ).map( i => { const value = i + 150; return `<option value="${value}">${value}</option>` } ).join('')
    const playerFields = no =>
        `<div class="player">` +
            `<div>Player ${no}</div>` +
            `<input data-js="name${no}" type="text" placeholder="Name" />` + 
            `<div class="select-wrap">` +
                `<select data-js="shirtSize${no}">` +
                    `<option value="null">Shirt Size</option>` +
                    `<option value="s">Small</option>` +
                    `<option value="m">Medium</option>` +
                    `<option value="l">Large</option>` +
                    `<option value="xl">X-Large</option>` +
                    `<option value="xxl">XX-Large</option>` +
                    `<option value="xxxl">XXX-Large</option>` +
                    `<option value="xxxxl">XXXX-Large</option>` +
                    `<option value="xxxxxl">XXXXX-Large</option>` +
                `</select>${selectCaret}` +
            `</div>` +
            `<div class="select-wrap">` +
                `<select data-js="ace${no}">` +
                    `<option value="null">Ace Fund</option>` +
                    `<option value="true">Yes!</option>` +
                    `<option value="falsem">Not right now</option>` +
                `</select>${selectCaret}` +
            `</div>` +
            `<div class="select-wrap">` +
                `<select data-js="disc{no}">` +
                    `<option value="null">I like to throw</option>` +
                    `<option value="stable">Stable</option>` +
                    `<option value="under">Under Stable</option>` +
                    `<option value="over">Over Stable</option>` +
                `</select>${selectCaret}` +
            `</div>` +
            `<div class="select-wrap">` +
                `<select data-js="weight{no}">` +
                    `<option value="null">My preferred weight is</option>` + weightOptions +
                `</select>${selectCaret}` +
            `</div>` +
        `</div>`
         
    return `` +
`<section>
  <div class="featured-event">
    <img src="/static/img/basket-sunrise.jpg"/>
    <div class="content">
        <div class="center">
            <div>Join us for the 16th Annual</div>
            <div>BYOP</div>
            <div>Belmont Park / Dayton / August 11-13, 2017</div>
        </div>
    </div>
  </div>
  <h3>Registration</h3>
  <div class="sub-heading">Enter your information below.</div>
  <div class="registration">
      <div class="info">Recreation and Intermediate divisions will play on August 12th.  All other divisions will play August 13th. There must be 3 teams to make a division. If you sign up for a division that is too small you will have the option to move to another division.</div>
      <div class="select-wrap division">
          <select data-js="division">
            <option value="null">Division</option>
            <option value="rec">Recreation</option>
            <option value="int">Intermediate</option>
            <option value="adv">Advanced</option>
            <option value="adv-mas">Advanced Masters</option>
            <option value="opn">Open</option>
            <option value="opn-mas">Open Masters</option>
            <option value="wom">Women's</option>
            <option value="wom-opn">Women's Open</option>
            <option value="mix">Mixed</option>
          </select>
          ${selectCaret}
      </div>
      <div class="players">
          ${playerFields('1')}  
          ${playerFields('2')}
          <div class="info">$5 per player for entry into the ace fund. You can pass for now and still enter your team on the day of the event.</div>
          <div class="info">Shirt sizes XXL and larger will include an extra fee of $2.50.</div>
      </div>
      <div class="contact">
          <div>Contact</div>
          <div class="info">We will not release your info to anyone.  Contact information will only be used for us to reach you for purposes related to the BYOP event.</div>
          <input data-js="email" type="text" placeholder="Email" />
          <input data-js="phone" type="text" placeholder="Phone Number" />
      </div>
      <div class="payment-info">
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
                <div>CCV</div>
                <input data-js="ccv" type="text" />
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
