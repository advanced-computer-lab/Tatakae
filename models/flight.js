// models/flight.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    unique: true,
    required: true
  },
  from:{
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  airportTerminal: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  arrivalDate : {
    type: Date,
    required: true,
    validate: function(input) {
      /* return true only if the input is a valid date, AND is 
      greater than or equal to the departure time */
      return new Date(input) >= this.departureDate;
  },
  message: input => `${input}(Arrival Date) must be greater than or equal to the departure date!`

},
  economySeats: {
    type: [Boolean],
    required: true,
    default: [false]
  },
  businessSeats: {
    type: [Boolean],
    required: true,
    default: [false] 
  },
  firstSeats: {
    type: [Boolean],
    required: true,
    default: [false]
  },
  totalSeats: {
    type: Number,
    //changed default
    default: 0
  },
  availableSeats: {
    type: Number,
    required : false,
    default: 0
  },
  economyPrice: {
    type: Number,
    required: true,
    default: 0
  },
  businessPrice: {
    type: Number,
    required: true,
    default: 0
  },
  firstPrice: {
    type: Number,
    required: true,
    default: 0
  },
  economybaggage: {             // in Kilograms
    type: Number,
    required: true,
    default: 30
  },
  businessbaggage: {             // in Kilograms
    type: Number,
    required: true,
    default: 30
  },
  firstbaggage: {             // in Kilograms
    type: Number,
    required: true,
    default: 30
  }
});

flightSchema.plugin(uniqueValidator, {message: 'Flight Already exists!!'});

module.exports = flight = mongoose.model('flight', flightSchema);