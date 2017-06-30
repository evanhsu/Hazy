module.exports = ( { user } ) => {
    const divisions = [
        'Open',
        'Open Masters',
        'Advanced Masters',
        'Open Grand Masters',
        'Womens',
        'Advanced',
        'Intermediate',
        'Rec',
        'Mixed'
    ],
        html = divisions.map( division =>
            `<div class="Division">
                <h4>${division}</h4>
                <ol class="header">
                    <li>
                        <span>Team</span>
                        <span>Round 1</span>
                        <span>Round 2</span>
                        <span>Total</span>
                    </li>
                </ol>
                <ol data-js="${division}"></ol>
            </div>` ).join('')

return `<section>
    <h3>2016 BYOP Results by Division</h3>
    ${html}
    <div data-view="byopSponsors"></div>
</section>`
}
