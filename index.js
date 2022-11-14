const express = require("express");
const filmsController = require("./controllers/filmsController");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!");
});

app.get("/films", filmsController.getFilms);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
