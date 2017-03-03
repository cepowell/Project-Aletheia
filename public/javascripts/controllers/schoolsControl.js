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
    $scope.posts = school.posts;
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

    $scope.addComment = function(post) {
      try {
        if (!$scope.school.post.body || $scope.school.post.body == "") {return;}
        post.comments.push({
          body: $scope.school.post.body,
          upvotes: 0
        });
        schools.addComment($scope.school._id, post, {
          body: $scope.school.post.body,
        }).success(function(post, comment) {
          post.post.comments.push(comment);
        });
        $scope.school.post.body = "";
      }
      catch(err) {
        return;
      }
    };

  }
]);
