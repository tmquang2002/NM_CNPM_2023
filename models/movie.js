const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  trailer: { type: String, required: true },
  cens: { type: String, enum: ['G', 'PG', '12A', '15', '18'], required: true },
  genres: [{ type: String }],
  release: { type: Date, required: true },
  length: { type: Number, required: true },
  format: { type: String, enum: ['2D', '3D'], required: true },
  poster: { type: String, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
