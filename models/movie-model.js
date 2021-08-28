const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    imageTitle: {
      type: String,
    },
    imageThumbnail: {
      type: String,
    },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
