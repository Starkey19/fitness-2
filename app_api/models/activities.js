var mongoose = require( 'mongoose' );

//config for secret file
fs = require("fs")
var fileName = "../secret-config.json";
var secretConfig;

var possibleTypes = ['run', 'hike', 'swim', 'bike ride' ];

var activitySchema = new mongoose.Schema({
  activityType: {
    type: [{type: String, enum: possibleTypes}],  //String,
    default: ['run'] ,
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
