// models/flight.js
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  From: {
    type: String,
    required: true
  },
  To: {
    type: String,
    required: true
  },
  FlightDate : {
    type: Date,
    required: true
  },
  Economy: {
    type: Number,
    required: true,
    default: 0 
  },
  Business: {
    type: Number,
    required: true,
    default: 0 ,

  },
  First: {
    type: Number,
    required: true,
    default: 0 
  },
  TotalSeats: {
    type: Number,
    required: true,
    default: {$sum : [First,Economy,Business]}  
  },
  price: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = flight = mongoose.model('flight', flightSchema);