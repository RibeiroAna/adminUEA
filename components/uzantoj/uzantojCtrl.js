app.controller("uzantojCtrl", function ($scope, $rootScope, $window, $http,
                                             $routeParams, config) {
  $scope.init = function() {
    if (($window.localStorage.getItem('token') == null) ||
        ($window.localStorage.getItem('token') == 0)) {
      $window.location.href = '#!/login';
    }
    $rootScope.menuo = true;

    var req = {
        method: 'GET',
        url: config.api_url + '/uzantoj/' + $routeParams.id,
        headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
    $http(req).then(function(response) {
      $scope.uzanto = response.data[0];
    });
  }

  $scope.strip = function(string) {
    if(string == null)
      return string;
    return string.slice(0,10);
  }
});
