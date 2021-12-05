// models/reservation.js
//import { ObjectId } from 'mongoose';

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  reservationNumber:{
    type: String,       // not needed from user handled in backend
    unique: true,
    required: true
  },
  user:{
    type: mongoose.ObjectId,
    required: true
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  departureTicket:{
    type: Object,
    required: false
  },
  returnTicket:{
    type: Object,
    required: false,
    default: null 
  },
  departureFlight:{
    type: mongoose.ObjectId,
    required: false
  },
  returnFlight:{
    type: mongoose.ObjectId,
    required: false ,
    default: null 
  }

});


module.exports = reservation = mongoose.model('reservation', reservationSchema);