import express from "express";

import { readSettingsJSON } from "../scripts/readSettings.js";

let router = express.Router();

router.get("/", function (req, res) {
    let {entries, categories} = readSettingsJSON()
    res.status(200).render("index", {entries, categories});
});

router.post("/sync", function (req, res) {
    console.log(req.body.categoryIndexMap, req.body.modMap)
    res.status(200).send()
});

export default router;
