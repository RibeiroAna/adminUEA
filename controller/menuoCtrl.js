app.controller("menuoCtrl", function ($scope, $rootScope, $window, $http, config) {
  $scope.elsaluti = function() {
    $window.localStorage.setItem('token', 0);
    $window.location.href = '#!/login';
  }
});
