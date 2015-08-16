'use strict';

app.controller('mainController', ['$rootScope', '$scope', 'cache', 'menu', '$filter', '$location', '$routeParams', '$route', function($rootScope, $scope, cache, menu, $filter, $location, $routeParams, $route) {
    

    // Trigger out refresh/update method.
    $scope.$on('menu.update', function(event, args) {

        $scope.selected = args.options.selected;
        $scope.rootMenu = args.options.rootMenu;
        var pageName = (angular.isDefined($scope.rootMenu[0]) ? $scope.rootMenu[0].name : $scope.rootMenu.name);
        if (angular.isUndefined(pageName)) return;
        var page = $filter('sanitize')(pageName);
        var subItem = (args.options.subItem != '' && angular.isDefined($routeParams.sub) ? args.options.subItem : $filter('sanitize')($scope.selected));
        cache.find('/static/'+page+'.json', function(data) {
            $scope.page = (angular.isDefined(subItem) && angular.isDefined(data[page].subItem) && angular.isDefined(data[page].subItem[subItem]) ? $scope.page = data[page].subItem[subItem] : data[page]);
        });
    });


    // Listen for our route success.
    $scope.$on('routeChangeSuccess', function(event, options) {
        var current = options.next;
        if (angular.isUndefined(current.params.name)) return;
        // Initially set some defaults
        $scope.selected = current.params.name || $routeParams.name;
        var index = $.grep(Object.keys($scope.menuItems), function (k) { return $filter('sanitize')($scope.menuItems[k].name) == $scope.selected; });

        $scope.rootMenu = $scope.menuItems[index];
        menu.update({
            rootMenu : $scope.rootMenu,
            selected : $scope.selected,
            subItem : current.params.sub || ''
        });
    });
}]);

app.filter("sanitize", [function() {
  return function(val){
    if (angular.isUndefined(val)) return '';
    return angular.lowercase(val.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, ''));
  }
}]);

app.filter('trust',['$sce', function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
}]);