var mongoose = require('mongoose');
var loc = mongoose.model('Location'); //Location model

//Enums for possible type of activity
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: [mongoose.Schema.Types.ObjectId],
    ref : 'Location',
    default: []
  }
});

mongoose.model('Activity', activitySchema);
