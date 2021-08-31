const {
  createMovie,
  updateMovie,
  getMovie,
  getMovies,
  deleteMovie,
  getRandomMovieOrSeries,
} = require('../services/movie-service');

class MovieController {
  async create(req, res) {
    try {
      const movie = await createMovie(req.body);
      res.json(movie);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: err.message || 'Internal server error' });
    }
  }

  async getMovie(req, res) {
    try {
      res.json(await getMovie(req.params.id));
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: err.message || 'Internal server error' });
    }
  }

  async getAllMovies(req, res) {
    try {
      res.json(await getMovies());
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: err.message || 'Internal server error' });
    }
  }
  async getRandom(req, res) {
    try {
      const movie = await getRandomMovieOrSeries(req.query.type);
      res.json(movie);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: err.message || 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const updatedMovie = await updateMovie(req.params.id, req.body);
      res.json(updatedMovie);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  }
  async deleteMovie(req, res) {
    try {
      await deleteMovie(req.params.id);
      res.json({ message: 'Movie removed' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  }
}
module.exports = new MovieController();
