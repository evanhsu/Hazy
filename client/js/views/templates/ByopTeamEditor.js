module.exports = ( { opts, GetSelectOptions } ) => {
    const selectCaret = require('./lib/caret-down')( { name: 'caret' } )
    const byopTeamEdit = opts.byopKeys.map( key => {
        const meta = opts.byopAttributes[ key ],
            data = `data-js="${key}" data-name="${key}"`,
            input = meta.type === 'select'
                ? `<div class="select-wrap"><select ${data}>${GetSelectOptions( opts.byopMeta[ meta.range ] )}</select>${selectCaret}</div>`
                : `<input ${data} />`
        return `<div><label>${meta.label}</label>${input}</div>`
    } ).join('')

return `<section>
    <h1 data-js="heading">Team Editor</h1>
    <div data-js="content" class="content hidden">
        <div data-view="typeAhead"></div>
        <div data-js="selectedTeam" class="selected-team hide hidden">
            <div class="static-data">
                <div>
                    <label>Paid in Store:</label>
                    <span data-js="paidCash"></span>
                </div>
                <div>
                    <label>On Waiting List:</label>
                    <span data-js="waitList"></span>
                </div>
            </div>
            <form>${byopTeamEdit}</form>
            <div class="changes" data-js="changes"></div>
            <div data-view="buttonFlow" data-name="byopTeamEdit">
        </div>
    </div>
</section>`
}
