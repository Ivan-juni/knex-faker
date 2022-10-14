const knexConfig = require("../db/knexfile");
const { attachPaginate } = require("knex-paginate");
attachPaginate();

// * connection with knex
const knex = require("knex")(knexConfig["development"]);

class FilmsController {
  getFilms(req, res) {
    const { id, year, name, country } = req.query;
    let limit = req.query.limit || 5;
    let page = req.query.page || 1;
    const find = (paramName, param) => {
      knex
        .select({
          id: "films.id",
          name: "name",
          premiere_year: "year",
          country: "country",
        })
        .from("films")
        .where(`films.${paramName}`, param)
        .leftJoin("country", "films.id_country", "country.id")
        .paginate({ perPage: limit, currentPage: page })
        .then((film) => {
          return res.json(film);
        })
        .catch((err) => {
          console.log("Error: ", err);
          return res.json({
            success: false,
            message: "An error occurred, please try again later",
          });
        });
    };

    // ! ID
    if (id && !year && !name && !country) {
      find("id", id);
    }
    //! YEAR
    else if (!id && year && !name && !country) {
      find("year", year);
    }
    //! NAME
    else if (!id && !year && name && !country) {
      find("name", name);
    }
    //! COUNTRY
    else if (!id && !year && !name && country) {
      knex
        .select({
          id: "films.id",
          name: "name",
          premiere_year: "year",
          country: "country",
        })
        .from("films")
        .where(`country.country`, country)
        .leftJoin("country", "films.id_country", "country.id")
        .paginate({ perPage: limit, currentPage: page })
        .then((film) => {
          return res.json(film);
        })
        .catch((err) => {
          console.log("Error: ", err);
          return res.json({
            success: false,
            message: "An error occurred, please try again later",
          });
        });
    }
    //! ALL FILMS (with pagination)
    else {
      knex("films")
        .select({
          id: "films.id",
          name: "name",
          premiere_year: "year",
          country: "country",
        })
        .leftJoin("country", "films.id_country", "country.id")
        .paginate({ perPage: limit, currentPage: page })
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
}

module.exports = new FilmsController();
