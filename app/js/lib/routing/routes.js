app.config(['$routeProvider', '$httpProvider', '$locationProvider',
  function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider.when('/page/:name', {
        templateUrl: 'views/page.html',
        controller: 'mainController'
      }).
     when('/page/:name/:sub*', {
        templateUrl: 'views/page.html',
        controller: 'mainController'
      }).
      when('/', {
        templateUrl: 'views/page.html',
        controller: 'mainController'
      })
      .otherwise({
        title : '404 - Page not found',
        redirectTo : '/404',
        template: '<h4>Whoops!</h4><p>Sorry! The page you\'ve requested cannot be found</p>',
        controller: 'mainController'
      });
      // use the HTML5 History API
      $locationProvider.html5Mode(true);
}]);

