describe('Main controller', function() {
  var $controller, $scope, mainController;

  beforeEach(angular.mock.module('mainControl'));
  beforeEach(angular.mock.module('postsService'));
  beforeEach(angular.mock.module('schoolsService'));
  beforeEach(angular.mock.module('authService'));

  beforeEach(inject(function($rootScope, _$controller_) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    mainController = $controller('MainCtrl', {$scope: $scope});
  }));

  it('should be defined', function() {
    expect(mainController).toBeDefined();
  });

});
