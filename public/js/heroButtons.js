/**
 * analog to getModMap
 */
function getCategoryMap() {
    let categoryOrder = Array.from(document.querySelectorAll("#categoryName"));
    let categoryMap = {};
    for (let i = 0; i < categoryOrder.length; i++) {
        let category = {};
        let visibilityText = categoryOrder[i]
            .closest(".columns")
            .querySelector("#toggleVisibility i").innerText;
        switch (visibilityText) {
            case "visibility_off":
                category["Collapsed"] = true;
                break;
            default:
                category["Collapsed"] = false;
                break;
        }
        category["Index"] = i;
        categoryMap[categoryOrder[i].innerText] = category;
    }
    return { categoryMap };
}

/**
 * gets a dict of all mods mapped against a nested
 * dict containing necessary information to reassign
 * each mod (active, index, category) for each mod;
 * -> {*modID: {Index: *index, Category: *category, isActive: *active}}
 */
function getModMap() {
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
    let { categoryMap } = getCategoryMap();
    let { modMap } = getModMap();
    await fetch("/sync", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryMap, modMap }),
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
