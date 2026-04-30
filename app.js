const express = require("express");
const session = require("express-session");
const router = require("./routes/index");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "heelstivate_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  res.locals.session = req.session || {};
  next();
});

app.use(function (req, res, next) {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use("/", router);

app.listen(3000, () => {
  console.log("Heelstivate is running on http://localhost:3000");
});
