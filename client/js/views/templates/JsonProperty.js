module.exports = ( { viewName, isEditable, model } ) =>
`<div>
    <div contenteditable="${isEditable}">${model.key}</div>
    <div data-view="${viewName}"></div>
    <div data-view="buttonFlow" />
</div>`
