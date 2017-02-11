var mongoose = require( 'mongoose' );

//config for secret file
fs = require("fs")
var fileName = "../secret-config.json";
var secretConfig;

var activitySchema = new mongoose.Schema({
  activityType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  owner: { //ID of user who created this activity
    type : mongoose.Schema.Types.ObjectId
  }
});

mongoose.model('Activity', activitySchema);
