const express = require("express");
const path = require("path");

// starting point
const app = express();

// 3rd party package
app.set("views", path.join(__dirname, "view/pages"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res, next) => {
    res.render("client/home.ejs");
});

app.listen(4050, () => {
    console.log("your app started on http://localhost:4050");
});
