angular.module('schoolsControl', [])

.controller('SchoolsCtrl', [
  '$scope',
  'schools',
  'school',
  'posts',
  'auth',
  function($scope, schools, school, posts, auth){
    $scope.schools = schools.schools;
    $scope.school = school;
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.incrementTally = function(school) {
      schools.increaseTally(school);
    };

    $scope.addPost = function() {
      if (!$scope.title || !$scope.body || $scope.title == "" || $scope.body == "") {return;}
      schools.addPost(school._id, {
        title: $scope.title,
        body: $scope.body,
      }).success(function(post) {
        $scope.school.posts.push(post);
      });
      $scope.title = "";
      $scope.body = "";
    };

  }
]);
