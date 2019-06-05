'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  email: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  countryCode: {
    type: String,
    default: ''
  },
  createdOn: {
    type: Date,
    default: ""
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date,
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  userName:{
    type: String,
    default: ''
  },

})


mongoose.model('User', userSchema);