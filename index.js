const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
    console.log(req.method, req.url, res.statusCode);
    next();
});

app.use("/", require("./routes/routes"));

app.listen(port);
