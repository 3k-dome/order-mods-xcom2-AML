
import * as fs from 'fs';

export function readSettingsJSON() {
    let settingsJSON = fs.readFileSync("AML/settings.json");
    settingsJSON = JSON.parse(settingsJSON)
    let entries = settingsJSON.Mods.Entries;
    return entries;   
}