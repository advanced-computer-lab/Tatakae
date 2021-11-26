// models/user.js
const mongoose = require('mongoose');
const validator = require('mongoose-validator')
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  administrator: {
    type: Boolean,
    default: false,
  },
  homeAddress: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  telephoneNumber: {
    type: [],
    required: true,
    default: []
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    validate: [
      validator({
        validator: 'isEmail',
        message: 'Oops..please enter valid email'
      })
    ],
    required: true
  },
  passportNumber: {
    type: Number,
    required: true,
    default: 0
  }
 
});
userSchema.plugin(uniqueValidator, {message: 'email is already registered.'});
module.exports = user = mongoose.model('user', userSchema);