var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

//config for secret file
fs = require("fs")
var fileName = "../secret-config.json";
var secretConfig;

try {
  secretConfig = require(fileName);
}
catch (err) {
  secretConfig = {};
  console.log("unable to read file '" + fileName + "': ", err)
}

var auth = jwt({
  secret: secretConfig.Secret,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

var ctrlActivities = require('../controllers/activities');


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

//activities
router.get('/activities', auth, ctrlActivities.activitiesRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
