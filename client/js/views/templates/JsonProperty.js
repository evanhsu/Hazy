module.exports = ( { viewName, isEditable, model } ) =>
`<li>
    <div contenteditable="${isEditable}">${model.key}</div>
    <div data-view="${viewName}"></div>
    <div data-view="buttonFlow" />
</li>`
