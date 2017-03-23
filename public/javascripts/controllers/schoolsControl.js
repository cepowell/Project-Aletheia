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

    // Filters for checkbox that shows only the current user's posts
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

    // Verify current user is the owner of a post
    $scope.ownershipCheck = function(post) {
      return (post.author == $scope.currentUser());
    };

    // Increae the school's assault tally; calls schoolsService increaseTally method
    $scope.incrementTally = function(school) {
      schools.increaseTally(school);
    };

    // Add a link to a school; calls schoolsService addLink method
    $scope.addLink = function() {
      if (!$scope.link || $scope.link === "") {return;}
      $scope.school.links.push($scope.link);
      schools.addLink(school, $scope.link);
      $scope.link = "";
    };

    // Fetch latitude and longitude of click location when map is clicked, pass those values to $scope
    $rootScope.$on("clicked", function(){
      $scope.$apply(function(){
          $scope.latitude = parseFloat(mapService.clickLat).toFixed(3);
          $scope.longitude = parseFloat(mapService.clickLong).toFixed(3);
      });
    });

    // Add a story to a school; calls schoolsService addStory method
    $scope.addStory = function() {
      if (!$scope.storyTitle || !$scope.storyBody || !$scope.latitude || !$scope.longitude || $scope.storyTitle === "" || $scope.storyBody === "" || $scope.latitude === "" || $scope.longitude === "")
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

    // Add a post to a school; calls schoolsService addPost method
    $scope.addPost = function() {
      if (!$scope.title || !$scope.body || $scope.title === "" || $scope.body === "") {return;}
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

    // Add a comment to a post; calls postsService addComment method
    $scope.addComment = function(post) {
      if (!$scope.school.post.body || $scope.school.post.body === "") {return;}
      posts.addComment(post._id, {
        body: $scope.school.post.body,
        created: Date.now()
      }).success(function(comment) {
        post.comments.push(comment);
      });
      $scope.school.post.body = "";
    };

    // Increment the upvotes of a post; calls postsService upvote method
    $scope.incrementPostUpvotes = function(post) {
      posts.upvote(post);
    };

    // Delete a post; calls postsService delete method
    $scope.deletePost = function(post) {
      var index = $scope.posts.indexOf(post._id);
      $scope.posts.splice(index, 1);
      if (confirm("Are you sure you want to delete this post and all associated comments?")) {
        alert("The post " + post.title + " has been successfully deleted.");
      }
      posts.delete(post);
	  };

    // Delete a comment from a post; calls postsService deleteComment method
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
