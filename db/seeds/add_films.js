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

//seed
exports.seed = function (knex) {
  // to use the concrete seed
  if (true) {
    // push generated films to insert
    function pushFilms() {
      const FILMS = []
      Array.from({ length: 1000000 }).forEach(() => {
        FILMS.push(createRandomFilm())
      })
      return FILMS
    }
    return (
      knex('films')
        // Deletes ALL existing entries
        .del()
        .then(function () {
          const insertFilms = () => {
            return pushFilms()
          }
          // Inserts seed entries
          return knex.batchInsert('films', insertFilms(), 5000)
        })
    )
  }
}
