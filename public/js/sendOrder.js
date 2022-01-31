/**
 * turns an array of mod or category names into
 * a dict which maps the name against the index
 * to make reordering linear;
 * [a, b] -> {a: 0, b: 1}
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
 * their current index in the ui;
 * -> {*categoryName: *categoryIndex}
 */
function getCategoryOrder() {
    let categoryOrder = Array.from(document.querySelectorAll("#categoryName"));
    for (let i = 0; i < categoryOrder.length; i++) {
        categoryOrder[i] = categoryOrder[i].innerText;
    }
    return { categoryIndexMap: flatArrayToIndexMap(categoryOrder) };
}

/**
 * gets a dict of all mods mapped against a nested
 * dict containing necessary information to reassign
 * each mod (active, index, category) for each mod;
 * -> {*modID: {Index: *index, Category: *category, isActive: *active}}
 */
function getModOrderAndCategoryMap() {
    let modOrder = Array.from(document.querySelectorAll("#modID"));
    let modMap = {};
    for (let i = 0; i < modOrder.length; i++) {
        let mod = {};
        mod["Index"] = i;
        mod["Category"] = modOrder[i]
            .closest(".columns")
            .querySelector("#categoryName").innerText;
        mod["isActive"] = modOrder[i]
            .closest("tr")
            .querySelector("#modActive").checked;
        modMap[modOrder[i].innerText] = mod;
    }
    return { modMap };
}

async function syncOrder() {
    let { categoryIndexMap } = getCategoryOrder();
    let { modMap } = getModOrderAndCategoryMap();
    await fetch("/sync", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryIndexMap, modMap }),
    });
}

async function syncOrderClick() {
    await syncOrder();
    location.reload();
}

async function addCategory() {
    let categoryName = window.prompt("Category Name: ");
    await fetch("/add", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName }),
    });
}

async function addCategoryClick() {
    await addCategory();
    location.reload();
}
