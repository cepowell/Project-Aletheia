var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var School = mongoose.model('School');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.param('school', function(req, res, next, id) {
  var query = School.findById(id);

  query.exec(function (err, school){
    if (err) {return next(err);}
    if (!school) {return next(new Error('can\'t find school'));}
    req.school = school;
    return next();
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) {return next(err);}
    if (!comment) {return next(new Error('can\'t find comment'));}
    req.comment = comment;
    return next();
  })
});

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.get('/schools', function(req, res, next) {
  School.find(function(err, schools){
    if(err) {return next(err);}
    res.json(schools);
  });
});

router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.post('/schools', auth, function(req, res, next) {
  var school = new School(req.body);
  school.save(function(err, school){
    if(err){return next(err);}
    res.json(school);
  });
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    res.json(post);
  });
});

router.get('/schools/:school', function(req, res, next) {
    req.school.populate('posts', function(err, school) {
      res.json(req.school);
    });
});

router.put('/posts/:post/upvote', auth, function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }
    res.json(post);
  });
});

router.put('/schools/:school/tally', auth, function(req, res, next) {
  req.school.increaseTally(function(err, school){
    if (err) { return next(err); }
    res.json(school);
  });
});

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

router.post('/posts/:post/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.post('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) {return next(err);}
    res.json(comment);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Missing username or password'});
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if(err){ return next(err); }
    return res.json({token: user.generateToken()})
  });
});

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
