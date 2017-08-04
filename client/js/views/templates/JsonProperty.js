module.exports = ( { viewName, isEditable, model } ) =>
`<div>
    <div data-view="buttonFlow"></div>
    <div contenteditable="${isEditable}">${model.key}</div>
    <div data-view="${viewName}"></div>
</div>`
