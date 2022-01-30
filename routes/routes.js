import express from "express";

import { readSettingsJSON } from "../scripts/readSettings.js";

let router = express.Router();

router.get("/", function (req, res) {
    console.log(readSettingsJSON())
    res.status(200).render("index", {});
});

export default router;
