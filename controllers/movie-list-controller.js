const { create, getListOfMovies } = require('../services/movielist-service');

class MovieListController {
  async createList(req, res) {
    try {
      await create(req.body);
      return res.status(201).json({ ok: true });
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
