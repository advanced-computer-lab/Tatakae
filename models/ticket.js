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
  email:{
    type: String,
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
  departureTerminal: {
    type: String,
    required: true
  },
  arrivalTerminal: {
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
  economySeatsAdults: {
    type: [Number],
    required: true,
    default: [0] 
  },
  businessSeatsAdults: {
    type: [Number],
    required: true,
    default: [0] 
  },
  firstSeatsAdults: {
    type: [Number],
    required: true,
    default: [0] 
  },
  economySeatsChildren: {
    type: [Number],
    required: true,
    default: [0] 
  },
  businessSeatsChildren: {
    type: [Number],
    required: true,
    default: [0] 
  },
  firstSeatsChildren: {
    type: [Number],
    required: true,
    default: [0] 
  },

  totalPrice: {            
    type: Number,
    required: true,
    default:  0  
  }
});

ticketSchema.plugin(uniqueValidator, {message: 'Ticket Already exists!!'});

module.exports = ticket = mongoose.model('ticket', ticketSchema);