const mongoose = require('mongoose');

const Products = new mongoose.Schema({
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
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Products', Products);
