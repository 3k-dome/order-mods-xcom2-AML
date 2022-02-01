for (const key in document.styleSheets) {
    if (document.styleSheets[key].title == "condensedStyle") {
        document.styleSheets[key].disabled ^= true;
    }
}

function condensedStyleClick(button) {
    for (const key in document.styleSheets) {
        if (document.styleSheets[key].title == "condensedStyle") {
            document.styleSheets[key].disabled ^= true;
        }
    }
    let icon = button.querySelector("i");
    switch (icon.innerText) {
        case "density_large":
            icon.innerText = "density_small";
            break;
        default:
            icon.innerText = "density_large";
            break;
    }
}
