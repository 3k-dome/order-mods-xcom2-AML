import { readSettingsJSON } from "../scripts/readSettings.js";
import { writeSettingsJSON } from "./writeSettings.js";

export function reorderSettings(categoryMap, modMap) {
    let settingsJSON = readSettingsJSON();
    /**
     * move all mods from the settings.json into a array
     * and empty the settings.json to reassign each mod
     * by the gathered modMap (see public/js/sendOrder.js)
     *
     * also assign the new category index ...
     */
    let modDictArray = [];
    for (const key in settingsJSON.Mods.Entries) {
        settingsJSON.Mods.Entries[key].Entries.forEach((modDict) => {
            modDictArray.push(modDict);
        });
        settingsJSON.Mods.Entries[key].Entries = [];
        settingsJSON.Mods.Entries[key].Index = categoryMap[key].Index;
        settingsJSON.Mods.Entries[key].Collapsed = categoryMap[key].Collapsed;
    }
    /**
     * reassign each mod to its category using the modMap
     * and change passed values (index, active)
     */
    modDictArray.forEach((modDict) => {
        modDict.Index = modMap[modDict.ID].Index;
        modDict.isActive = modMap[modDict.ID].isActive;
        settingsJSON.Mods.Entries[modMap[modDict.ID].Category].Entries.push(
            modDict
        );
    });
    writeSettingsJSON(settingsJSON);
}

export function addCategory(categoryName) {
    let settingsJSON = readSettingsJSON();
    // new category is added on top so everything need to be pushed back
    for (const key in settingsJSON.Mods.Entries) {
        settingsJSON.Mods.Entries[key].Index++;
    }
    settingsJSON.Mods.Entries[categoryName] = {
        Index: 0,
        Collapsed: false,
        Entries: [],
    };
    writeSettingsJSON(settingsJSON);
}

export function delCategory(categoryName) {
    let settingsJSON = readSettingsJSON();
    let position = settingsJSON.Mods.Entries[categoryName].Index;
    // move all mods from category to "Unsorted"
    settingsJSON.Mods.Entries[categoryName].Entries.forEach((modDict) => {
        settingsJSON.Mods.Entries.Unsorted.Entries.push(modDict);
    });
    delete settingsJSON.Mods.Entries[categoryName];
    // re-index categories
    for (const key in settingsJSON.Mods.Entries) {
        if (settingsJSON.Mods.Entries[key].Index > position) {
            settingsJSON.Mods.Entries[key].Index--;
        }
    }
    writeSettingsJSON(settingsJSON);
}
