angular.module('schoolsControl', [])

.controller('SchoolsCtrl', [
  '$scope',
  '$rootScope',
  'mapService',
  'schools',
  'school',
  'posts',
  'auth',
  function($scope, $rootScope, mapService, schools, school, posts, auth){
    $scope.schools = schools.schools;
    $scope.school = school;
    $scope.posts = school.posts;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;

    console.log($scope.school.stories);

    $scope.filters = {
        x: false,
        author: '',
        search: ''
    };

    $scope.actions = {
        showMyPosts: function () {
            if($scope.filters.x) {
                $scope.filters.author = $scope.currentUser();
            } else {
                 $scope.filters.author = '';
            }
        }
    };

    $scope.ownershipCheck = function(post) {
      return (post.author == $scope.currentUser());
    }

    $scope.incrementTally = function(school) {
      schools.increaseTally(school);
    };

    $scope.addLink = function() {
      if (!$scope.link || $scope.link == "") {return;}
      $scope.school.links.push($scope.link);
      schools.addLink(school, $scope.link);
      $scope.link = "";
    };

    $rootScope.$on("clicked", function(){
      $scope.$apply(function(){
          $scope.latitude = parseFloat(mapService.clickLat).toFixed(3);
          $scope.longitude = parseFloat(mapService.clickLong).toFixed(3);
      });
    });

    $scope.addStory = function() {
      if (!$scope.storyTitle || !$scope.storyBody || !$scope.latitude || !$scope.longitude
          || $scope.storyTitle == "" || $scope.storyBody == "" || $scope.latitude == "" || $scope.longitude == "")
          {return;}
      schools.addStory(school._id, {
        title: $scope.storyTitle,
        body: $scope.storyBody,
        location: [$scope.longitude, $scope.latitude],
        created: Date.now(),
      }).success(function(story) {
        $scope.school.stories.push(story);
        mapService.refresh(39.50, -98.35);
      });
      $scope.storyTitle = "";
      $scope.storyBody = "";
      $scope.latitude = "";
      $scope.longitude = "";
    };

    $scope.addPost = function() {
      if (!$scope.title || !$scope.body || $scope.title == "" || $scope.body == "") {return;}
      schools.addPost(school._id, {
        title: $scope.title,
        body: $scope.body,
        created: Date.now(),
      }).success(function(post) {
        $scope.school.posts.push(post);
      });
      $scope.title = "";
      $scope.body = "";
    };

    $scope.addComment = function(post) {
      if (!$scope.school.post.body || $scope.school.post.body == "") {return;}
      posts.addComment(post._id, {
        body: $scope.school.post.body,
        created: Date.now()
      }).success(function(comment) {
        post.comments.push(comment);
      });
      $scope.school.post.body = "";
    };

    /*$scope.addComment = function(post) {
      try {
        if (!$scope.school.post.body || $scope.school.post.body == "") {return;}
        post.comments.push({
          body: $scope.school.post.body,
          upvotes: 0
        });
        schools.addComment($scope.school._id, post, {
          body: $scope.school.post.body,
          created: Date.now()
        }).success(function(post, comment) {
          post.post.comments.push(comment);
        });
        $scope.school.post.body = "";
      }
      catch(err) {
        return;
      }
    };*/

    $scope.incrementPostUpvotes = function(post) {
      posts.upvote(post);
    };

    $scope.deletePost = function(post) {
      var index = $scope.posts.indexOf(post._id);
      $scope.posts.splice(index, 1);
      if (confirm("Are you sure you want to delete this post and all associated comments?")) {
        alert("The post " + post.title + " has been successfully deleted.");
      }
      posts.delete(post);
	  };

    /*$scope.editPost = function(post) {
      posts.edit(post);
    };*/

    $scope.deleteComment = function(post, comment) {
      var postIndex = $scope.posts.indexOf(post);
      var commentIndex = $scope.posts[postIndex].comments.indexOf(comment);
      $scope.posts[postIndex].comments.splice(commentIndex, 1);
      if (confirm("Are you sure you want to delete this comment?")) {
        alert("The comment has been successfully deleted.");
      }
      posts.deleteComment(post._id, comment);
    };

  }
]);
