describe('Schools factory', function() {

  var schools;

  beforeEach(angular.mock.module('authService'));
  beforeEach(angular.mock.module('schoolsService'));

  beforeEach(inject(function(_schools_) {
    schools = _schools_;
  }));

  it('should exist', function() {
    expect(schools).toBeDefined();
  });

  describe('verifying schools service methods', function() {

    it('getAll method should exist', function() {
        expect(schools.getAll).toBeDefined();
    });

    it('get method should exist', function() {
        expect(schools.get).toBeDefined();
    });

    it('create method should exist', function() {
        expect(schools.create).toBeDefined();
    });

    it('increaseTally method should exist', function() {
        expect(schools.increaseTally).toBeDefined();
    });

    it('addLink method should exist', function() {
        expect(schools.addLink).toBeDefined();
    });

    it('addStory method should exist', function() {
        expect(schools.addStory).toBeDefined();
    });

    it('addPost method should exist', function() {
        expect(schools.addPost).toBeDefined();
    });

  });

});
