angular.module('postsControl', [])

.controller('PostsCtrl', [
  '$scope',
  'posts',
  'schools',
  'school',
  'auth',
  function($scope, posts, post, schools, school, auth){
    //$scope.post = post;
    //$scope.isLoggedIn = auth.isLoggedIn;
    $scope.schools = schools;
    $scope.school = school;
    console.log(school);
    console.log($scope.school);
    /*$scope.addComment = function(){
      if($scope.body === '') { return; }
      posts.addComment(post._id, {
        body: $scope.body,
        author: 'user',
        }).success(function(comment) {
          $scope.post.comments.push(comment);
        });
        $scope.body = '';
      };
    $scope.incrementUpvotes = function(comment){
      posts.upvoteComment(post, comment);
    };*/
  }
]);
