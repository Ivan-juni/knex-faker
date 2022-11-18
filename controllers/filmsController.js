const filmsService = require('../service/films-service')

class FilmsController {
  getFilms(req, res) {
    const films = filmsService.getFilteredItems(req.query)

    if (!films) {
      return res.json({
        success: false,
        message: 'An error occurred, please try again later',
      })
    }

    films.then((data) => res.json(data))
  }
}

module.exports = new FilmsController()
