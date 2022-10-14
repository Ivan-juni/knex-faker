const faker = require("@faker-js/faker");

const FILMS = [];

function createRandomFilm(filmNumber) {
  filmNumber++;
  return {
    name: `Film ${faker.faker.datatype.number}`,
    year: faker.faker.datatype.number({
      min: 1990,
      max: 2022,
    }),
    id_country: faker.faker.datatype.number({
      min: 1,
      max: 4,
    }),
  };
}

// seed
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("films")
    .del()
    .then(function () {
      const insertMFilms = () => {
        Array.from({ length: 1000000 }).forEach(() => {
          FILMS.push(createRandomFilm());
        });
        return FILMS;
      };
      // Inserts seed entries
      return knex.batchInsert("films", insertMFilms(), 5000);
    });
};

// // seed
// exports.seed = function (knex) {
//   // Deletes ALL existing entries
//   return knex("films")
//     .del()
//     .then(function () {
//       const insertMFilms = () => {
//         const films = [];
//         for (let i = 1; i <= 1000000; i++) {
//           films.push({ name: `Фильм ${i}`, year: 2010, id_country: 1 });
//         }
//         return films;
//       };
//       // Inserts seed entries
//       return knex.batchInsert("films", insertMFilms(), 5000);
//     });
// };
