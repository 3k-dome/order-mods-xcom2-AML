var tableBodies = document.querySelectorAll("tbody");

tableBodies.forEach((tableBody) => {
    Sortable.create(tableBody, {
        handle: ".handle",
        filter: ".static",
        animation: 100,
        multiDrag: true,
        selectedClass: "selectedMod",
        group: "mods",
        // while moving -> change preview item style
        onStart: function (event) {
            event.item.classList.add("previewMod");
        },
        onEnd: function (event) {
            event.item.classList.remove("previewMod");
        },
    });
});

var section = document.querySelector(".section");

Sortable.create(section, {
    handle: ".handle",
    filter: ".static",
    animation: 100,
    multiDrag: true,
    selectedClass: "selectedCategory",
    group: "categories",
    // while moving -> change preview item style
    onStart: function (event) {
        event.item.classList.add("previewCategory");
    },
    onEnd: function (event) {
        event.item.classList.remove("previewCategory");
    },
    /**
     * prevents mods from being moved outside a category
     * if a mod would have been selected after a category
     * by making all mods (<tr>'s) static while moving a
     * category; requires a specified filter (.static)
     */
    onSelect: function () {
        var tableRows = document.querySelectorAll("tr");
        tableRows.forEach((tableRow) => {
            tableRow.classList.add("static");
        });
    },
    onDeselect: function () {
        var tableRows = document.querySelectorAll("tr");
        tableRows.forEach((tableRow) => {
            tableRow.classList.remove("static");
        });
    },
});
