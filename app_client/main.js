(function () {

  angular.module('fitness', ['ngRoute', 'ngFileUpload']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/profile/profile.view.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .when('/activity', {
        templateUrl: '/activity/activity.view.html',
        controller: 'activityCtrl',
        controllerAs: 'vm'
      })
      .when('/activity/new', {
        templateUrl: '/activity/newActivity.view.html',
        controller: 'newActivityCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

//Redirect to home if user isn't logged in, redirect to profile if logged in
//or trying to register
  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
        $location.path('/');
      } else if ($location.path() === '/login' && authentication.isLoggedIn()||
                $location.path() === '/register' && authentication.isLoggedIn()) {
          $location.path('/profile');
      }
    });
  }

  angular
    .module('fitness')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();
