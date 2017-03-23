describe('Nav controller', function() {
  var $controller, $scope, navController;

  beforeEach(angular.mock.module('authService'));
  beforeEach(angular.mock.module('navControl'));

  beforeEach(inject(function($rootScope, _$controller_, auth) {
    $scope = $rootScope.$new();
    $controller = _$controller_;
    navController = $controller('NavCtrl', {$scope: $scope});
  }));

  it('should be defined', function() {
    expect(navController).toBeDefined();
  });

});
