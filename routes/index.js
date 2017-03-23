var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var School = mongoose.model('School');
var Story = mongoose.model('Story');


var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* School param */
router.param('school', function(req, res, next, id) {
  var query = School.findById(id);
  query.exec(function (err, school){
    if (err) {return next(err);}
    if (!school) {return next(new Error('can\'t find school'));}
    req.school = school;
    return next();
  });
});

/* Story param */
router.param('story', function(req, res, next, id) {
  var query = Story.findById(id);
  query.exec(function (err, story){
    if (err) { return next(err); }
    if (!story) { return next(new Error('can\'t find story')); }
    req.story = story;
    return next();
  });
});

/* Post param */
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);
  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }
    req.post = post;
    return next();
  });
});

/* Comment param */
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) {return next(err);}
    if (!comment) {return next(new Error('can\'t find comment'));}
    req.comment = comment;
    return next();
  });
});

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET list of schools */
router.get('/schools', function(req, res, next) {
  School.find(function(err, schools){
    if(err) {return next(err);}
    res.json(schools);
  });
});

/* POST new school */
router.post('/schools', auth, function(req, res, next) {
  var school = new School(req.body);
  school.save(function(err, school){
    if(err){return next(err);}
    res.json(school);
  });
});

/* GET individual school */
router.get('/schools/:school', function(req, res, next) {
    req.school.populate('stories');
    req.school.populate({
      path: 'posts',
      populate: {path: 'comments'},
    }, function(err, school) {
      res.json(req.school);
    });
});

/* INCREASE school's tally */
router.put('/schools/:school/tally', auth, function(req, res, next) {
  req.school.increaseTally(function(err, school){
    if (err) { return next(err); }
    res.json(school);
  });
});

/* ADD a link to a school */
router.put('/schools/:school/link', auth, function(req, res, next) {
  req.school.links.push(req.body.link);
  req.school.save(function(err, school) {
    if(err) {return next(err);}
    res.json(school);
  });
});

/* GET all stories */
router.get('/stories', function(req, res, next) {
  Story.find(function(err, stories){
    if(err){ return next(err); }
    res.json(stories);
  });
});

/* GET an individual story */
router.get('/stories/:story', function(req, res, next) {
  res.json(req.story);
});

/* POST a new story within a school */
router.post('/schools/:school/stories', auth, function(req, res, next) {
  var story = new Story(req.body);
  story.school = req.school;
  story.author = req.payload.username;

  story.save(function(err, story) {
    if(err){return next(err);}
    req.school.stories.push(story);
    req.school.save(function(err, school) {
      if(err){return next(err);}
      res.json(story);
    });
  });
});

/* GET all posts */
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }
    res.json(posts);
  });
});


/* GET an individual post */
router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    res.json(post);
  });
});

/* POST a new post within a school */
router.post('/schools/:school/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.school = req.school;
  post.author = req.payload.username;

  post.save(function(err, post) {
    if(err){return next(err);}
    req.school.posts.push(post);
    req.school.save(function(err, school) {
      if(err){return next(err);}
      res.json(post);
    });
  });
});

/* UPVOTE a post */
router.put('/posts/:post/upvote', auth, function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }
    res.json(post);
  });
});

/* DELETE a post */
router.delete('/posts/:post', auth, function(req, res) {
	req.post.comments.forEach(function(id) {
		Comment.remove({
			_id: id
		}, function(err) {
			if (err) { return next(err);}
		});
	});
	Post.remove({
		_id: req.params.post
	}, function(err, post) {
		if (err) { return next(err); }

		Post.find(function(err, posts) {
			if (err) { return next(err); }

			res.json(posts);
		});
	});
});

/* GET a comment */
router.get('/posts/:post/comments/:comment', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    res.json(post);
  });
});

/* POST a new comment on a post */
router.post('/posts/:post/comments', auth, function(req, res, next) {
	var comment = new Comment(req.body);
	comment.post = req.post;
	comment.author = req.payload.username;

	comment.save(function(err, comment) {
		if (err) { return next(err); }

		req.post.comments.push(comment);
		req.post.save(function(err, post) {
			if (err) { return next(err); }

			res.json(comment);
		});
	});
});

/* DELETE a comment */
router.delete('/posts/:post/comments/:comment', auth, function(req, res) {
  Comment.remove({
    _id: req.params.comment
  }, function(err, comment) {
    if (err) {return next(err);}
    Comment.find(function(err, comments) {
      if (err) {return next(err);}
      res.json(comments);
    });
  });
});

/* REGISTER */
router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Missing username or password'});
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if(err){ return next(err); }
    return res.json({token: user.generateToken()});
  });
});

/* LOGIN */
router.post('/login', function(req, res, next) {
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Missing username or password'});
  }
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateToken()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
