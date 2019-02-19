// Chamando bibliotecas
const express = require("express");
const nunjucks = require("nunjucks");

// Iniciando o express
const app = express();

// Configurando o Nunjuks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

// Setando o view engine njk no projeto
app.set("view engine", "njk");

// Configurando o projeto pra interpretar html
app.use(express.urlencoded({ extended: false }));

// middleware que checa: se não digitar nada, redireciona para a rota principal
const checaValor = (req, res, next) => {
  const { age } = req.query;
  if (!age) {
    return res.redirect("/");
  }

  return next();
};

// Rota principal
app.get("/", (req, res) => {
  return res.render("principal");
});

// Rota check
app.post("/check", (req, res) => {
  const { age } = req.body;
  if (age > 18) {
    return res.redirect(`/major?age=${age}`);
  } else {
    return res.redirect(`/minor?age=${age}`);
  }
});

// Rota major
app.use("/major", checaValor, (req, res) => {
  return res.render("major");
});

// Rota menor
app.use("/minor", checaValor, (req, res) => {
  const { age } = req.query;
  return res.render("minor", { age });
});

app.listen(3000);
