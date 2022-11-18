exports.up = function (knex) {
  return (
    knex.schema
      //! country table
      .createTableIfNotExists('country', function (table) {
        // integer id
        table.increments()

        // country
        table.string('country', 100)
      })
      //! films table
      .createTableIfNotExists('films', (table) => {
        table.increments()
        table.string('name', 100).notNullable() // name
        table.integer('year', 4) // year

        // id_country
        table
          .integer('id_country', 3)
          .unsigned()
          .references('id')
          .inTable('country')

        // table.index("name", "idx_name");
      })
      //! genre table
      .createTableIfNotExists('genre', function (table) {
        // integer id
        table.increments()

        // genre
        table.string('genre', 100)
      })
      //! genre_films table
      .createTableIfNotExists('genre_films', function (table) {
        // integer id
        table.increments()

        // id_film
        table
          .integer('id_film', 7)
          .unsigned()
          .references('id')
          .inTable('films')
          .onDelete('CASCADE')

        // id_genre
        table
          .integer('id_genre', 3)
          .unsigned()
          .references('id')
          .inTable('genre')
          .onDelete('CASCADE')
      })
      //! insert some values from start
      .then(() =>
        knex('country').insert([
          { country: 'Ukraine' },
          { country: 'Spain' },
          { country: 'USA' },
          { country: 'Italy' },
        ])
      )
      .then(() =>
        knex('films').insert([
          { name: 'Фильм 1', year: 2010, id_country: 4 },
          { name: 'Фильм 2', year: 2012, id_country: 2 },
        ])
      )
      .then(() =>
        knex('genre').insert([
          { genre: 'Shooter' },
          { genre: 'Documentary' },
          { genre: 'Comedy' },
          { genre: 'Fantastic' },
        ])
      )
      .then(() =>
        knex('genre_films').insert([
          { id_film: 1, id_genre: 3 },
          { id_film: 1, id_genre: 2 },
          { id_film: 2, id_genre: 2 },
        ])
      )
  )
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('genre_films')
    .dropTableIfExists('genre')
    .dropTableIfExists('films')
    .dropTableIfExists('country')
  // return knex.schema
  //   .dropTableIfExists('country')
  //   .dropTableIfExists('genre')
  //   .dropTableIfExists('genre_films')
  //   .dropTableIfExists('films')
}
