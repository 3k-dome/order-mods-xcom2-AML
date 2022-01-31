import express from "express";

import { readSettingsJSON } from "../scripts/readSettings.js";

let router = express.Router();

router.get("/", function (req, res) {
    let {entries, categories} = readSettingsJSON()
    res.status(200).render("index", {entries, categories});
});

router.post("/sync", function (req, res) {
    res.status(200).send()
});

export default router;
