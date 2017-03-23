describe('Auth factory', function() {

  var auth;

  beforeEach(angular.mock.module('authService'));

  beforeEach(inject(function(_auth_) {
    auth = _auth_;
  }));

  it('should exist', function() {
    expect(auth).toBeDefined();
  });

  describe('verifying auth service methods', function() {

    it('should exist', function() {
        expect(auth.saveToken).toBeDefined();
    });

    it('should exist', function() {
        expect(auth.getToken).toBeDefined();
    });

    it('should exist', function() {
        expect(auth.isLoggedIn).toBeDefined();
    });

    it('should exist', function() {
        expect(auth.currentUser).toBeDefined();
    });

    it('should exist', function() {
        expect(auth.register).toBeDefined();
    });

    it('should exist', function() {
        expect(auth.logIn).toBeDefined();
    });

    it('should exist', function() {
        expect(auth.logOut).toBeDefined();
    });

  });

});
