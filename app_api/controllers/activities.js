var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.activiesRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user); //Sends status 200 (ok) and json doc
      });
  }

};
