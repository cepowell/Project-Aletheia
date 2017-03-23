angular.module('navControl', [])

.controller('NavCtrl', [
  '$scope',
  'auth',
  function($scope, auth){

    // Used to provide current user's username and login check to the navbar
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;
    
}]);
