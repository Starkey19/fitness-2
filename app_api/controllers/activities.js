var mongoose = require('mongoose');
var User = mongoose.model('User');
var Activity = mongoose.model('Activity');

module.exports.createActivity = function(req, res) {


var activity = new Activity();

activity.activityType = req.body.activityType;
activity.name = req.body.name;
activity.owner = req.body.owner;

activity.save(function(err) {
  if (err) return res.json(err);
  });
}

module.exports.activitiesRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private "
    });
  } else {
      Activity
      .findById(req.payload._id)
      .exec(function(err, activity) {
        res.status(200).json(activity); //Sends status 200 (ok) and json doc
      });
  }
};
