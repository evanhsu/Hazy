module.exports = ( { opts, GetSelectOptions } ) => {
    const byopTeamEdit = opts.byopKeys.map( key => {
        const meta = opts.byopAttributes[ key ],
            data = `data-js="${key}" data-name="${key}"`,
            input = meta.type === 'select'
                ? `<select ${data}>${GetSelectOptions( opts.byopMeta[ meta.range ] )}</select>`
                : `<input ${data} />`
        return `<div><label>${meta.label}</label>${input}</div>`
    } ).join('')

return `<div>
    <section>
        <h1>Team Editor</h1>
        <div data-view="typeAhead"></div>
        <div data-js="selectedTeam" class="selected-team hide hidden">
            <form>${byopTeamEdit}</form>
            <div class="changes" data-js="changes"></div>
            <div data-view="buttonFlow" data-name="byopTeamEdit">
        </div>
    </section>
</div>`
}
