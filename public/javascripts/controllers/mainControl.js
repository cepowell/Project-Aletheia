angular.module('mainControl', [])

.controller('MainCtrl', [
  '$scope',
  'posts',
  'schools',
  'auth',
  function($scope, posts, schools, auth){
    $scope.schools = schools.schools;
    $scope.posts = posts.posts;
    $scope.isLoggedIn = auth.isLoggedIn;

    // Add a school to the database; calls schoolsService create method
    $scope.addSchool = function() {
      if (!$scope.name || $scope.name === '') {return;}
      schools.create({
        name: $scope.name,
      });
      $scope.name = '';
    };

  }
]);
