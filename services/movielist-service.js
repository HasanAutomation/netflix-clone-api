const List = require('../models/list-model');
class MovieListService {
  async create(data) {
    const movieList = await List.create(data);
    return movieList;
  }

  async updateMovieList(id, body) {
    const updatedMovieList = await List.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    return updatedMovieList;
  }

  async getListOfMovies(type, genre) {
    let list;
    if (type) {
      list = genre
        ? await List.aggregate([
            {
              $sample: { size: 10 },
            },
            {
              $match: { type, genre },
            },
          ])
        : await List.aggregate([
            {
              $sample: { size: 10 },
            },
            {
              $match: { type },
            },
          ]);
    } else {
      list = await List.aggregate([
        {
          $sample: { size: 10 },
        },
      ]);
    }
    return list;
  }
}

module.exports = new MovieListService();
