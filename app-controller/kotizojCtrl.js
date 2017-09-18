app.controller("kotizojCtrl", function ($scope, $rootScope, $window, $http, config) {

  if (($window.localStorage.getItem('token') == null) ||
      ($window.localStorage.getItem('token') == 0)) {
    $window.location.href = '#!/login';
  }

  $rootScope.menuo = true;
  $http.get(config.api_url + "/landoj").then(function(response) {
      $scope.landoj = response.data;
  });
});
