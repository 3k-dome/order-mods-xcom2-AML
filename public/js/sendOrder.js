/**
 * turns an array of mod or category names into
 * a dict which maps the name against the index
 * to make reordering linear
 */
function flatArrayToIndexMap(array) {
    let dict = {};
    array.forEach((element, index) => {
        dict[element] = index;
    });
    return dict;
}

/**
 * gets a dict of all category names mapped against
 * their current index in the ui
 */
function getCategoryOrder() {
    let categoryOrder = Array.from(document.querySelectorAll("#categoryName"));
    for (let i = 0; i < categoryOrder.length; i++) {
        categoryOrder[i] = categoryOrder[i].innerText;
    }
    return { categoryIndexMap: flatArrayToIndexMap(categoryOrder) };
}

/**
 * gets a dict of all mod names mapped against
 * their current index in the ui and dict of
 * all mod names mapped against their category
 */
function getModOrderAndCategoryMap() {
    let modOrder = Array.from(document.querySelectorAll("#modName"));
    let modCategoryMap = {};
    for (let i = 0; i < modOrder.length; i++) {
        let category = modOrder[i]
            .closest(".columns")
            .querySelector("#categoryName").innerText;
        modOrder[i] = modOrder[i].innerText;
        modCategoryMap[modOrder[i]] = category;
    }
    return { modIndexMap: flatArrayToIndexMap(modOrder), modCategoryMap };
}

async function syncOrder() {
    let { categoryIndexMap } = getCategoryOrder();
    let { modIndexMap, modCategoryMap } = getModOrderAndCategoryMap();
    await fetch("/sync", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryIndexMap, modIndexMap, modCategoryMap }),
    });
    location.reload();
}
