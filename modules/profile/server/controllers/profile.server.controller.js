'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Profile = mongoose.model('Profile');

// NOTE THIS IS NOT AS REST-CENTRIC AS THE EXAMPLE FROM THE DICKEY BOOK
  
/**
 * Create a 
 */
exports.create = function (req, res) {
	console.log("in create");

  var profile = new Profile(req.body);
  console.log("new profile: " + profile);
  profile.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(profile);
    }
  });

};

/**
 * Show the current Profile
 */
exports.read = function (req, res) {
  res.json(req.profile);
};

/**
 * Update a Profile
 * TODO combine with create if deemed appropriate
 */
exports.update = function (req, res) {
	console.log("in update");
  var profile = req.profile;
  profile.lastname = req.body.lastname;
  profile.firstname = req.body.firstname;
  profile.contractingagency = req.body.contractingagency;
  profile.checkedin = req.body.checkedin;
  profile.mobilenumber = req.body.mobilenumber;
  console.log("name: " + profile.lastname + ", " + profile.firstname + ", agency: " + profile.contractingagency + ", checkedin: " + profile.checkedin + ", mobilenumber: " + profile.mobilenumber);
  profile.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
		console.log("(2) name: " + profile.lastname + ", " + profile.firstname + ", agency: " + profile.contractingagency + ", checkedin: " + profile.checkedin);
       res.json(profile);
    }
  });
};

/**
 * Delete a Profile
 * (probably don't really ever want to delete these)
 */
exports.delete = function (req, res) {
  var profile = req.profile;

  profile.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(profile);
    }
  });

};

/**
 * List of Profiles
 */
exports.list = function (req, res) {
	console.log("in list");
  Profile.find().sort('-lastname').exec(function (err, profiles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
		console.log("returning profiles");
      res.json(profiles);
    }
  });

};

/**
 * Profile middleware (not sure how this is supposed to work)
 */
exports.profileByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Profile is invalid'
    });
  }

  Profile.findById(id).exec(function (err, profile) {
    if (err) {
      return next(err);
    } else if (!profile) {
      return res.status(404).send({
        message: 'No profile with that identifier has been found'
      });
    }
    req.profile = profile;
    next();
  });
};
