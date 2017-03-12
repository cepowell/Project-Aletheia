angular.module('states', [])

.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['schools', function(schools){
            return schools.getAll();
          }]
        }
      })

      .state('schools', {
        url: '/schools/{id}',
        templateUrl: '/schools.html',
        controller: 'SchoolsCtrl',
        resolve: {
          school: ['$stateParams', 'schools', function($stateParams, schools) {
            return schools.get($stateParams.id);
          }]
        }
      })

      /*.state('posts', {
        url: '/school/{id}/posts',
        templateUrl: '/posts.html',
        controller: 'SchoolsCtrl',
        resolve: {
          school: ['$stateParams', 'schools', function($stateParams, schools) {
            return schools.get($stateParams.id);
          }]
        }
      })

      .state('individual-post', {
        url: 'school/{schoolid}/posts/post',
        templateUrl: '/individual-post.html',
        controller: 'SchoolsCtrl',
        resolve: {
          school: ['$stateParams', 'schools', function($stateParams, schools) {
            console.log($stateParams.id);
            return schools.get($stateParams.id);
          }]
        }
      })*/

      .state('login', {
        url: '/login',
        templateUrl: '/login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
          if(auth.isLoggedIn()){
            $state.go('home');
          }
        }]
      })

      .state('register', {
        url: '/register',
        templateUrl: '/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
          if(auth.isLoggedIn()){
            $state.go('home');
          }
        }]
      });

    $urlRouterProvider.otherwise('home');

}]);
