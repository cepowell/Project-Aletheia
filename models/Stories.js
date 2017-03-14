var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  school: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
  created: { type: Date, default: Date.now },
  location: [Number] // [Long, Lat]
});

mongoose.model('Story', StorySchema);
