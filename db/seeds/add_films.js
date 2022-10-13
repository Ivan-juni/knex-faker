exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("films")
    .del()
    .then(function () {
      const insertMFilms = () => {
        const films = [];
        for (let i = 1; i <= 1000000; i++) {
          films.push({ name: `Фильм ${i}`, year: 2010, id_country: 1 });
        }
        return films;
      };
      // Inserts seed entries
      return knex.batchInsert("films", insertMFilms(), 5000);
      // return knex("films").insert([
      //   { name: "Фильм 1", year: 2010, id_country: 1 },
      //   { name: "Фильм 2", year: 2010, id_country: 2 },
      //   { name: "Фильм 3", year: 2010, id_country: 3 },
      //   { name: "Фильм 4", year: 2010, id_country: 4 },
      //   { name: "Фильм 5", year: 2010, id_country: 1 },
      // ]);
    });
};
