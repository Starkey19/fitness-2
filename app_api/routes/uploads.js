var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var fs = require('fs');
var Upload = require('../models/uploads');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

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
  });
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
    else {
      res.set({
        "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
        "Content-Type": upload.file.mimetype
      });
      fs.createReadStream(upload.file.path).pipe(res);
    }
  });
});

module.exports = router;
