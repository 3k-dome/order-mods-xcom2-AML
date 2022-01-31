import express from "express";

import { readMinSettingsJSON } from "../scripts/readSettings.js";
import {
    addCategory,
    delCategory,
    reorderSettings,
} from "../scripts/reorderSettings.js";

let router = express.Router();

router.get("/", function (req, res) {
    let { entries, categories } = readMinSettingsJSON();
    res.status(200).render("index", { entries, categories });
});

router.post("/sync", function (req, res) {
    reorderSettings(req.body.categoryMap, req.body.modMap);
    res.status(200).send();
});

router.post("/add", function (req, res) {
    addCategory(req.body.categoryName);
    res.status(200).send();
});

router.post("/del", function (req, res) {
    delCategory(req.body.categoryName);
    res.status(200).send();
});

export default router;
