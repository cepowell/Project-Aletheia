describe('Posts factory', function() {

  var posts;

  beforeEach(angular.mock.module('authService'));
  beforeEach(angular.mock.module('postsService'));

  beforeEach(inject(function(_posts_) {
    posts = _posts_;
  }));

  it('should exist', function() {
    expect(posts).toBeDefined();
  });

  describe('verifying posts service methods', function() {

    it('should exist', function() {
        expect(posts.getAll).toBeDefined();
    });

    it('should exist', function() {
        expect(posts.get).toBeDefined();
    });

    it('should exist', function() {
        expect(posts.create).toBeDefined();
    });

    it('should exist', function() {
        expect(posts.delete).toBeDefined();
    });

    it('should exist', function() {
        expect(posts.upvote).toBeDefined();
    });

    it('should exist', function() {
        expect(posts.addComment).toBeDefined();
    });

    it('should exist', function() {
        expect(posts.deleteComment).toBeDefined();
    });

  });

});
