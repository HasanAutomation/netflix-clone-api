const Movie = require('../models/movie-model');

class MovieService {
  async createMovie(data) {
    const movie = await Movie.create(data);
    return movie;
  }
  async updateMovie(id, data) {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return updatedMovie;
  }
  async deleteMovie(id) {
    await Movie.findByIdAndDelete(id);
  }
  async getMovie(id) {
    const movie = await Movie.findById(id);
    return movie;
  }
  async getMovies() {
    return await Movie.find();
  }
}

module.exports = new MovieService();
