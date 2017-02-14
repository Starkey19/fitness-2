var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var fs = require('fs');
var Upload = require('../models/uploads');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var mongoose = require('mongoose');
var User = mongoose.model('User');//require('../models/users');

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

router.get('/', function (req, res, next) {
  Upload.find({}, function (err, uploads) {
    if (err) next(err);
    else {
      res.send(uploads);
    }
  });
});

/**
 * Gets a file from the hard drive based on the unique ID and the filename
 */
router.get('/:uuid/:filename', function (req, res, next) {
  console.log(req.params);
  Upload.findOne({
    'file.filename': req.params.uuid,
    'file.originalname': req.params.filename
  }, function (err, upload) {
    if (err) next(err);
    else if (upload){
      console.log("upload:" + upload);
        res.set({
          "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
          "Content-Type": upload.file.mimetype
        });
        fs.createReadStream(upload.file.path).pipe(res);
      }
  });
});

router.post('/', upload.single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  var newUpload = {
    name: req.body.name,
    created: Date.now(),
    file: req.file
  };
  Upload.create(newUpload, function (err, next) {
    if (err) {
      next(err);
    } else {
      res.send(newUpload);
    }
    //Return the _id of newUpload and add it to the list of activities owned by uploader
    User.findOne({
      'email': req.body.owner}, function (err, user) {
        if (err) next(err);
        else if (user){
          console.log(user);
          console.log(newUpload._id);
          User.findByIdAndUpdate(user._id, { $push: {"uploads": newUpload._id} },
              {safe: true, upsert: true, new : true},
              function(err, model) {
                console.log(err);
              });
        }
      })
  });
});

module.exports = router;
