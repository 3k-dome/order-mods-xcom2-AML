import * as fs from "fs";

export function writeSettingsJSON(settingsJSON) {
    settingsJSON = JSON.stringify(settingsJSON, undefined, 2);
    fs.writeFileSync("AML/settings.json", settingsJSON);
}
