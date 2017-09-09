app.controller("landojCtrl", function ($scope, $rootScope, $window, $http, config) {

  if (($window.localStorage.getItem('token') == null) || ($window.localStorage.getItem('token') == 0)) {
    $window.location.href = '#!/login';
  }

  $rootScope.menuo = true;

  $http.get(config.api_url + "/landoj").then(function(response) {
      $scope.landoj = response.data;
  });

  $scope.novaLando = function() {
    //ja tentei todo tipo de header.
    $http.post( config.api_url + "/landoj", $scope.lando, {'x-access-token': $window.localStorage.getItem('token')});
    $window.location.reload();
  }
});
