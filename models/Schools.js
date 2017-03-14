var mongoose = require('mongoose');

var SchoolSchema = new mongoose.Schema({
  name: String,
  tally: {type: Number, default: 0},
  links: [{type: String}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  stories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Story'}]
});

SchoolSchema.methods.increaseTally = function(cb) {
  this.tally += 1;
  this.save(cb);
};

mongoose.model('School', SchoolSchema);
