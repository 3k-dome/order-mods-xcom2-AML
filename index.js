import express from "express";
import router from "./routes/routes.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
    console.log(req.method, req.url, res.statusCode);
    next();
});

app.use("/", router);

app.listen(port);
