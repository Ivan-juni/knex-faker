const faker = require('@faker-js/faker')

// generate new film with faker
function createRandomFilm() {
  return {
    name: `Film ${faker.faker.datatype.number({
      min: 1,
      max: 1000000,
    })}`,
    year: faker.faker.datatype.number({
      min: 1990,
      max: 2022,
    }),
    id_country: faker.faker.datatype.number({
      min: 1,
      max: 4,
    }),
  }
}

// add id to this filmsupdate
exports.seed = function (knex) {
  // to use the concrete seed
  if (false) {
    // push generated films to update
    function pushFilms() {
      const FILMS = []
      Array.from({ length: 10000 }).forEach(() => {
        FILMS.push(createRandomFilm())
      })
      return FILMS
    }

    const films = pushFilms()
    for (let i = 0; i < films.length; i++) {
      const film = films[i]
      film.id = i + 1
    }
    return knex.transaction((trx) => {
      const queries = []
      films.forEach((film) => {
        const query = knex('films')
          .where('id', film.id)
          .update({
            name: film.name,
            year: film.year,
            id_country: film.id_country,
          })
          .transacting(trx) // This makes every update be in the same transaction
        queries.push(query)
      })

      Promise.all(queries) // Once every query is written
        .then(trx.commit) // We try to execute all of them
        .catch(trx.rollback) // And rollback in case any of them goes wrong
    })
  }
}
