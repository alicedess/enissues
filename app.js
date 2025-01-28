const express = require("express");

const app = express();
const port = 3000;
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let issue = [];

app.get("/", (req, res) => {
  
  res.render("index", { issue });
});

app.post("/issues/create", (req, res) => {

  const { issue, name } = req.body;

  issues.push({ issue, name });
  res.redirect("/");
});
app.listen(port, () => {
  console.log("Le serveur tourne sur le port " + port);
});
