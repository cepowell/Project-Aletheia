angular.module('schoolsService', [])

.factory('schools', ['$http', 'auth', function($http, auth){
  var o = {
    schools: []
  };
  o.getAll = function() {
    return $http.get('/schools').success(function(data){
      angular.copy(data, o.schools);
    });
  };
  o.get = function(id) {
    return $http.get('/schools/' + id).then(function(res){
      return res.data;
    });
  };
  o.create = function(school) {
    return $http.post('/schools', school, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.schools.push(data);
    });
  };
  o.increaseTally = function(school) {
    return $http.put('/schools/' + school._id + '/tally', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      school.tally += 1;
    });
  };
  o.addPost = function(id, post) {
    return $http.post('/schools/' + id + '/posts', post, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.addComment = function(id, post, comment) {
    var data = {post: post, comment: comment};
    return $http.post('/schools/' + id + '/comments', data, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  return o;
}]);
