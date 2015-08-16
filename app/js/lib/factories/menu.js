app.factory('menu', ['$rootScope', '$filter', function ($rootScope, $filter) {
    var options = {
      selected : '',
      rootMenu : '',
    }
    var result = [];
    var broadcast = function (options) {
      var options = options || {};
      $rootScope.$broadcast('menu.update', {options : options});
    };

    var recursiveLoop = function(object) {
        if (angular.isUndefined(object)) return;
        result.push(object);
        for (var item in object.children) {
          if (options.subItem != $filter('sanitize')(object.children[item].name)) continue;
          object.children[item]['customHREF'] = $filter('sanitize')(object.name) + '/';
          recursiveLoop(object.children[item]);
        }
    }

    var update = function (newOptions, allowBroadcast) {
      var newOptions = newOptions || {};
      options = angular.extend({}, options, newOptions);
      result = [];
      if (angular.isDefined(options)) recursiveLoop(options.rootMenu);
      options.rootMenu = result;
      if (angular.isDefined(allowBroadcast) && allowBroadcast == false) return;
      if (angular.isUndefined(options)) return;
      broadcast(options);
    };

    

    return {
      update: update,
      selected: options.selected,
      rootMenu : options.rootMenu
    };
}]);