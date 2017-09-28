app.controller("kotizojCtrl", function ($scope, $routeParams, $rootScope, $window, $http, config) {

  $scope.init = function() {
      if (($window.localStorage.getItem('token') == null) ||
          ($window.localStorage.getItem('token') == 0)) {
        $window.location.href = '#!/login';
      }

      $rootScope.menuo = true;
      $scope.novKotizo = [];

      $http.get(config.api_url + "/grupoj/" + $routeParams.id).then(
        function(response) {
          $scope.grupo = response.data[0];
      });

      $http.get(config.api_url + "/grupoj/" + $routeParams.id + "/kotizoj").then(
        function(response) {
          $scope.kotizoj= response.data;
          $http.get(config.api_url + "/landoj").then(function(response) {
              $scope.landoj = response.data;
          });
      });
  }

  $scope.getKotizo = function(lando) {
    for(var i = 0; i < $scope.kotizoj.length; i++) {
        if($scope.kotizoj[i].idLando == lando.id) {
          $scope.kotizoj[i].prezo = $scope.kotizoj[i].prezo/100;
          $scope.kotizoj[i].junaRabato = $scope.kotizoj[i].junaRabato/100;
          return $scope.kotizoj[i];
        }
    }
  }

  $scope.postKotizo = function(idLando) {
    $scope.novKotizo[idLando].idLando = idLando;
    $scope.novKotizo[idLando].prezo = $scope.novKotizo[idLando].prezo * 100;
    $scope.novKotizo[idLando].junaRabato = $scope.novKotizo[idLando].junaRabato * 100;

    var req = {
      method: 'POST',
      url: config.api_url + "/grupoj/" + $routeParams.id + "/kotizoj",
      headers: {'x-access-token': $window.localStorage.getItem('token')},
      data: $scope.novKotizo[idLando]
    };
    $http(req).then(
      function(sucess){
        $window.location.reload();
      }
    );
  }

  $scope.updateKotizo = function(id, valoro, kampo) {
    if(kampo == 'prezo') {
      valoro = valoro * 100;
    }
    if(kampo == 'junaRabato') {
        valoro = valoro * 100;
    }
    var data = {id: id, valoro: valoro, kampo: kampo};
    var req = {
        method: 'PUT',
        url: config.api_url + "/grupoj/" + $routeParams.id + "/kotizoj",
        headers: {'x-access-token': $window.localStorage.getItem('token')},
        data: data
      };
      $http(req);
   }
});
