var mongoose = require('mongoose');

var UploadSchema = mongoose.Schema({
  name: String,
  create: Date,
  file: Object
});

module.exports = mongoose.model('Upload', UploadSchema);
