import * as fs from "fs";

function getCategoriesInOrder(entries) {
    let catagories = Object.keys(entries);
    for (const key in entries) {
        catagories[entries[key].Index] = key;
    }
    return catagories;
}

export function readSettingsJSON() {
    let settingsJSON = fs.readFileSync("AML/settings.json");
    settingsJSON = JSON.parse(settingsJSON);
    let entries = settingsJSON.Mods.Entries;
    return {"entries": entries, "categories": getCategoriesInOrder(entries)};
}
