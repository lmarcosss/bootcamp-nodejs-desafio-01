const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

const logMiddleware = (req, res, next) => {
  const { age } = req.query;
  if (!age) return res.redirect("/");

  next();
};

app.get("/", (req, res) => {
  return res.render("home", { users });
});

app.get("/new", (req, res) => {
  return res.render("new");
});

app.get("/major", logMiddleware, (req, res) => {
  const { age } = req.query;
  return res.render("major", { age });
});

app.get("/minor", logMiddleware, (req, res) => {
  const { age } = req.query;
  return res.render("minor", { age });
});

app.post("/create", (req, res) => {
  users.push(req.body.user);
  return res.redirect("/");
});

app.post("/check/:age", (req, res) => {
  const { age } = req.body;

  if (age >= 18) return res.redirect(`/major/?age=${age}`);
  else return res.redirect(`/minor/?age=${age}`);
});

app.listen(3000);
