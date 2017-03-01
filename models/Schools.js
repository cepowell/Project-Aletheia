var mongoose = require('mongoose');

var SchoolSchema = new mongoose.Schema({
  name: String,
  tally: {type: Number, default: 0},
  links: [{type: String}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

SchoolSchema.methods.increaseTally = function(cb) {
  this.tally += 1;
  this.save(cb);
};

/*SchoolSchema.methods.updateName = function(cb, name) {
  this.name = "Harvard University";
  this.save(cb);
}*/

mongoose.model('School', SchoolSchema);
