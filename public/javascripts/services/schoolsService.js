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
  o.create = function(school) {
    return $http.post('/schools', school, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.schools.push(data);
    });
  };
  o.addPost = function(id, post) {
    return $http.post('/schools/' + id + '/posts', post, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.increaseTally = function(school) {
    return $http.put('/schools/' + school._id + '/tally', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      school.tally += 1;
    });
  };
  o.get = function(id) {
    return $http.get('/schools/' + id).then(function(res){
      return res.data;
    });
  };
  return o;
}]);
