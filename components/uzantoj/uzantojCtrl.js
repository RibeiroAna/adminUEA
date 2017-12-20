app.controller("uzantojCtrl", function ($scope, $rootScope, $window, $routeParams,
                                        config, uzantojService, errorService) {
  $scope.init = function() {
    if (($window.localStorage.getItem('token') == null) ||
        ($window.localStorage.getItem('token') == 0)) {
      $window.location.href = '#!/login';
    }
    $rootScope.menuo = true;

    uzantojService.getUzantoj($routeParams.id).then(function(response) {
        $scope.uzanto = response.data[0];
    });
  }

  $scope.strip = function(string) {
    if(string == null)
      return string;
    return string.slice(0,10);
  }
});
