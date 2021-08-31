const { create, getListOfMovies } = require('../services/movielist-service');

class MovieListController {
  async createList(req, res) {
    try {
      return res.status(201).json(await create(req.body));
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message || 'Server Error' });
    }
  }
  async getList(req, res) {
    try {
      const lists = await getListOfMovies(req.query.type, req.query.genre);
      res.json(lists);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message || 'Server Error' });
    }
  }
}

module.exports = new MovieListController();
