// models/ticket.js
//import { ObjectId } from 'mongoose';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ticketSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,       // not needed from user handled in backend
    unique: true,
    required: true
  },
  user:{
    type: mongoose.ObjectId,
    required: true
  },
  flight:{
    type: mongoose.ObjectId,
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
  airport: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  arrivalDate : {
      type: Date,
      required: true
  },
  economySeats: {
    type: [Number],
    required: true,
    default: [0] 
  },
  businessSeats: {
    type: [Number],
    required: true,
    default: [0] 
  },
  firstSeats: {
    type: [Number],
    required: true,
    default: [0] 
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
  totalPrice: {            
    type: Number,
    required: true,
    default:  0  
  }
});

ticketSchema.plugin(uniqueValidator, {message: 'Ticket Already exists!!'});

module.exports = ticket = mongoose.model('ticket', ticketSchema);