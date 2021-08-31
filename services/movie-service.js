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
  async getRandomMovieOrSeries(type) {
    const movie = await Movie.aggregate([
      {
        $match: { isSeries: type === 'series' ? true : false },
      },
      {
        $sample: { size: 1 },
      },
    ]);
    return movie;
  }
}

module.exports = new MovieService();
