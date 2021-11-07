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
    type: Number,
    required: true,
    default: 0 
  },
  businessSeats: {
    type: Number,
    required: true,
    default: 0 ,
  },
  firstSeats: {
    type: Number,
    required: true,
    default: 0 
  },
  totalSeats: {
    type: Number,
    default: {function () {
      return this.economySeats + this.businessSeats + this.firstSeats
    } 
  }
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
  baggageAllowance: {             // in Kilograms
    type: Number,
    required: true,
    default: 30
  }
});

flightSchema.plugin(uniqueValidator, {message: 'Flight Already exists!!'});

module.exports = flight = mongoose.model('flight', flightSchema);