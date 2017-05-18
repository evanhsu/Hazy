module.exports = ( { model } ) =>  {
    const playerFields = no =>
        `<div>Player ${no}</div>` +
        `<input data-js="name${no}" type="text" placeholder="Name" />` + 
        `<div class="select-wrap">` +
            `<select data-js="shirtSize${no}">` +
                `<option value="null>Shirt Size</option>` +
                `<option value="s">Small</option>` +
                `<option value="m">Medium</option>` +
                `<option value="l">Large</option>` +
                `<option value="xl">X-Large</option>` +
                `<option value="xxl">XX-Large</option>` +
            `</select>` +
            + require('./lib/caret-down')() +
        `</div>` +
        `<div class="select-wrap">` +
            `<select data-js="ace${no}">` +
                `<option value="null>Ace Fund</option>` +
                `<option value="true">Yes!</option>` +
                `<option value="falsem">Not right now</option>` +
            `</select>` +
            + require('./lib/caret-down')() +
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
      <div class="select-wrap">
          <select data-js="division">
            <option value="null">Division</option>
            <option value="rec">Recreation</option>
            <option value="rec-int">Recreation Intermediate</option>
            <option value="int-adv">Intermediate Advanced</option>
            <option value="adv-opn">Advanced Open</option>
            <option value="mxd-adv">Mixed Advanced</option>
            <option value="mst-opn">Master's Open</option>
            <option value="mst-wmn">Master's Women</option>
            <option value="mst-wmn">Women's Open</option>
          </select>
          ${require('./lib/caret-down')()}
      </div>
      ${playerFields('1')}  
      ${playerFields('2')}  
      <div class="info">$5 per player for entry into the ace fund. You can pass for now and still enter your team on the day of the event.</div>
      <div>Contact</div>
      <div class="info">We will not release your info to anyone.  Contact information will only be used for us to reach you for purposes related to the BYOP event.</div>
      <input data-js="email" type="text" placeholder="Email" />
      <input data-js="phone" type="text" placeholder="Phone Number" />
      <div class="info">Need extra shirts? Tell us how many in the box below. $5 per shirt, limit 10 per team.</div>
      <div class="side-by-side">
        <div>Extra Shirts</div>
        <input data-js="extraShirts" type="text" maxlength="2" placeholder="0" />
      </div>
      <div>Payment Info</div>
      <div class="info">We only accept credit, debit cards for online registration.  A $3.50 fee will be added to the cost.  You can also pay in cash in one of our stores.</div>
      <input data-js="ccName" type="text" placeholder="Name on Card" />
      <input data-js="ccNo" type="text" placeholder="Number on Card" />
      <div class="exp-ccv">
        <div>
            <div>Expiration</div>
            <div>
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
            </div>
        </div>
        <div>
            <div>CCV</div>
            <input data-js="ccv" type="text" />
        </div>
      </div>
      <div>
        <button data-js="submitBtn" type="button">Submit</button>
      </div>
  </div>
</section>`
}
