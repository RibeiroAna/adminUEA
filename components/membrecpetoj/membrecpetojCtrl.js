app.controller("membrecpetojCtrl", function ($scope, $rootScope, $window, $http,
                                             $routeParams, config) {
  $scope.init = function() {
    if (($window.localStorage.getItem('token') == null) ||
        ($window.localStorage.getItem('token') == 0)) {
      $window.location.href = '#!/login';
    }

    $rootScope.menuo = true;
  }

  $scope.init1 = function() {
    $scope.init();
    $scope.bazaMembreco = config.idBazaMembreco;
    $http.get(config.api_url + "/grupoj/membrecoj/aldonoj").then(
      function(response) {
        $scope.krommembrecoj = response.data;
    });
  }

  $scope.init2 = function() {
    $scope.init();
    var req = {
        method: 'GET',
        url: config.api_url + '/grupoj/anecoj?idGrupo=' + $routeParams.id + '&aprobita=0',
        headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      $http(req).then(function(response) {
        $scope.anecpetoj = response.data;
      });
    $http.get(config.api_url + "/grupoj/" + $routeParams.id).then(
      function(response) {
        $scope.grupo = response.data[0];
    });

  }

  $scope.aprobi = function(peto) {
    var data = {
      anecnomo: $scope.grupo.nomo,
      retposxto: peto.retposxto
    };
    var req = {
      method: 'POST',
      data: data,
      url: config.api_url + '/grupoj/anecoj/' + peto.id + '/aprobi',
      headers: {'x-access-token': $window.localStorage.getItem('token')}
    }
    $http(req).then(function(response) {
      $window.location.reload();
    });
  }


  $scope.strip = function(string) {
    if(string == null)
      return string;
    return string.slice(0,10);
  }

});
