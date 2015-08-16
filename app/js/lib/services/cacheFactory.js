app.service('cache', ['$cacheFactory', '$http', '$rootScope', '$filter', function($cacheFactory, $http, $rootScope, $filter) {
  var cache = $cacheFactory('dataCache');
  function error(url) {
    console.error('File not found: ' + url);
  }
  this.find = function(url, success) {
    var cacheId = $filter('sanitize')(url);
    var cachedData = cache.get(cacheId);
    if ($rootScope.forceRefresh) cachedData = false;
    // Return the data if we already have it
    if (cachedData && angular.isFunction(success)) {
      success.apply(this, [cachedData]);
      return;
    }
    // Got get it since it's not in the cache
    $http.get(url).success(function(data) {
      cache.put(cacheId, data);
      if (angular.isFunction(success)) success.apply(this, [data]);
    }).error(function() {
      error.apply(this, [url]);
    });;
  };

}]);