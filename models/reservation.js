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
  departureTicket:{
    type: mongoose.ObjectId,
    required: true
  },
  returnTicket:{
    type: mongoose.ObjectId,
    required: true
  },
  departureFlight:{
    type: mongoose.ObjectId,
    required: true
  },
  returnFlight:{
    type: mongoose.ObjectId,
    required: true
  }

});


module.exports = reservation = mongoose.model('reservation', reservationSchema);