const express = require("express");
const app = express();
const port = 3000;

// Configuration des vues
app.set("views", "./views");
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Nécessaire pour traiter le JSON

// Liste des issues
let issues = [];

// Route pour afficher la page d'accueil
app.get("/", (req, res) => {
  res.render("index", { issues });
});

// Route pour créer une nouvelle issue
app.post("/issues/create", (req, res) => {
  const { author, title, description, status } = req.body;
  issues.push({
    author,
    title,
    description,
    status,
    creationDate: new Date().toLocaleDateString("fr-FR"),
  });
  res.redirect("/");
});

// Route pour mettre à jour l'état via JSON
app.post("/issues/update/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const { status } = req.body;

  if (issues[index]) {
    issues[index].status = status;
    res.status(200).send({ message: "État mis à jour avec succès." });
  } else {
    res.status(404).send({ error: "Issue non trouvée." });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log("Le serveur tourne sur le port " + port);
});
