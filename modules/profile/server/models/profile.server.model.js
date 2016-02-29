'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
  firstname: { type: String, required: true }, // no last name e.g. Icelanders, some Indonesians, etc. use this
  lastname: { type: String, required: true },
  contractingagency: { type: String, required: true },
  checkedin: { type: Boolean, required: true }
  /* ,
  mobilenumber : { type: String, required: true },
  alternatenumber : { type: String, required: true },
  email : { type: String, required: true },
  manageremail: { type: String, required: true }, // can use to access manager info, too relational?
  personalemaillastname: { type: String },
  username: { type: String } // if also a registered user */
});

mongoose.model('Profile', ProfileSchema);
