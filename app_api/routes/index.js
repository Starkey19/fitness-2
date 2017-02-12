var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var multer = require('multer');

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
router.get('/activity', auth, ctrlActivities.activitiesRead);
router.post('/activity/new', multer({ dest: 'uploads/' }).single('file')
, ctrlActivities.createActivity);

///

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
