app.controller("loginCtrl", function ($scope, $rootScope, $window, $http, config) {

  $rootScope.menuo = false;
  $scope.msg = "ERARO: Ni ne havas konekton kun la servilo nun";

  if (($window.localStorage.getItem('token') != null) &&
      ($window.localStorage.getItem('token') != 0)){
    $window.location.href = '#!/admin';
  }

  $http.get(config.api_url + '/admin/agordita').then(function(response) {
    if (response.data.agordita == false) {
      $scope.msg = "ATENTO: Tiu estas la unua fojo kiun iu uzas tiun sistemon." +
                   "Tajpu ajnan uzantnomon kaj pasvorton, kaj ili estos uzataj" +
                   " por ensaluti kiel ĉefa administranto estontece";
    } else {
        $scope.msg = "Ensalutu kun la datumoj antaŭdonitaj";
    }
  });

  $scope.ensaluti = function() {
    //farota
    //how to handle rejectiyon
    $http.post(config.api_url + '/admin/ensaluti', $scope.uzanto).then(
        function(response) {
          $window.localStorage.setItem('token', response.data.token);
          $window.location.href = '#!/admin';
        }, function(response) {
          $scope.msg = response.data.message;
      });
    }
});
