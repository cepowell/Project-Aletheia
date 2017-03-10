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

    $scope.addSchool = function() {
      if (!$scope.name || $scope.name === '') {return;}
      schools.create({
        name: $scope.name,
      });
      $scope.name = '';
    };

    /*$scope.addPost = function() {
      if(!$scope.title || $scope.title === '') { return; }
      posts.create({
        title: $scope.title,
        link: $scope.link,
      });
      $scope.title = '';
      $scope.link = '';
    };*/

  }
]);
