module.exports = team =>
`<li>
    <div>
        <div>
            <span>${team.name1}, ${team.name2}</span>
            <span class="disc-selection">${team.discs}</span>
            <span class="shirt-selection">${team.shirts}</span>
        </div>
    </div>
</li>`
