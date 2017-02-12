var mongoose = require('mongoose');
var User = mongoose.model('User');
var Activity = mongoose.model('Activity');

var toGeoJSON = require('toGeoJSON');
var jsdom = require('jsdom').jsdom;
var fs = require('fs');
var multer = require('multer');
var uploadLoc = multer({ dest: 'uploads/' }).single('file');//TODO

//Create a new activity from /activity/new route after uploading a gpx file and converting to geoJSON
module.exports.createActivity = function(req, res) {
//TODO: check if req.body.file is file
var file = req.body.file;
if (file) {
    fs.readFile(file.path)
}

var activity = new Activity();

activity.activityType = req.body.type;
activity.name = req.body.name;

//Get the currentUser and set owner to currentUser's ObjectId
activity.owner = req.body.owner._id;
//Convert req.body.file to GeoJSON and store in activity.location


activity.location =

activity.save(function(err) {
  if (err) return res.json(err);
  });
};

//Read an activity //TODO
module.exports.activitiesRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private " //TODO
    });
  } else {
      Activity
      .findById(req.payload._id)
      .exec(function(err, activity) {
        res.status(200).json(activity); //Sends status 200 (ok) and json doc
      });
  }
};
