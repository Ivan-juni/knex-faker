const knexConfig = require("../db/knexfile");

// * connection with knex
const knex = require("knex")(knexConfig["development"]);

class FilmsController {
  getFilms(req, res) {
    knex("films")
      .select({
        id: "films.id",
        name: "name",
        premiere_year: "year",
        country: "country.country",
      })
      .leftJoin("country", "films.id_country", "country.id")
      .then((films) => {
        return res.json(films);
      })
      .catch((err) => {
        console.log("Error: ", err);
        return res.json({
          success: false,
          message: "An error occurred, please try again later",
        });
      });
  }
}

module.exports = new FilmsController();
