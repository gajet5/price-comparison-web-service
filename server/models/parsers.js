const mongoose = require('mongoose');

const Parsers = new mongoose.Schema({
  parser: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  times: {
    type: Number,
    required: true
  },
  nextScanTime: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Parsers', Parsers);
