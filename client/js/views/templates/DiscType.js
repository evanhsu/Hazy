module.exports = datum =>
    `<li class="DiscType" data-id="${datum._id}">
        <span>${datum.title}</span>
        <div data-view="buttonFlow"></div>
    </li>`
