const knexConfig = require('../db/knexfile')
const { attachPaginate } = require('knex-paginate')
attachPaginate()

// * connection with knex
const knex = require('knex')(knexConfig['development'])

class FilmsService {
  getFilteredItems(searchCriteria) {
    const limit = searchCriteria.limit || 5
    const page = searchCriteria.page || 1

    return (
      knex
        .select({
          id: 'films.id',
          name: 'name',
          premiere_year: 'year',
          country: 'country',
        })
        .from('films')
        // andWhere - взаимоисключающее
        .where((qb) => {
          if (searchCriteria.id) {
            qb.where('films.id', '=', searchCriteria.id)
          }
          if (searchCriteria.year) {
            qb.andWhere('films.year', '=', searchCriteria.year)
          }
          if (searchCriteria.name) {
            qb.andWhere('films.name', 'like', `%${searchCriteria.name}%`)
          }
          if (searchCriteria.country) {
            qb.andWhere('country.country', '=', searchCriteria.country)
          }
        })
        // orWhere - не исключающее
        // .where((qb) => {
        //   if (searchCriteria.id) {
        //     qb.where('films.id', '=', searchCriteria.id)
        //   }
        //   if (searchCriteria.year) {
        //     qb.orWhere('films.year', '=', searchCriteria.year)
        //   }
        //   if (searchCriteria.name) {
        //     qb.orWhere('films.name', 'like', `%${searchCriteria.name}%`)
        //   }
        //   if (searchCriteria.country) {
        //     qb.orWhere('country.country', '=', searchCriteria.country)
        //   }
        // })
        .leftJoin('country', 'films.id_country', 'country.id')
        .paginate({ perPage: limit, currentPage: page })
        .then((film) => {
          return film
        })
        .catch((err) => {
          console.log('Error: ', err)
          return null
        })
    )
  }
}

module.exports = new FilmsService()
