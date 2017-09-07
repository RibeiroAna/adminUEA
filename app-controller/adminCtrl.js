app.controller("adminCtrl", function ($scope, $rootScope, $window) {

  $rootScope.menuo = true;

  if (($window.localStorage.getItem('token') == null) || ($window.localStorage.getItem('token') == 0)) {
    $window.location.href = '#!/login';
  }

});
