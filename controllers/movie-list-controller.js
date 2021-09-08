const {
  create,
  getListOfMovies,
  updateMovieList,
} = require('../services/movielist-service');

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

  async update(req, res) {
    try {
      await updateMovieList(req.params.id, req.body);
      res.status(200).json({ ok: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message || 'Server Error' });
    }
  }
}

module.exports = new MovieListController();
