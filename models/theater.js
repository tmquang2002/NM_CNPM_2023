const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;