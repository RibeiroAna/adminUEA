app.controller("membrojCtrl", function ($scope, $rootScope, $window, $http,
                                             $routeParams, config, auth, membrojService) {
  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;
  }

  $scope.init1 = function() {
      $scope.init();
      $scope.bazaMembreco = config.idBazaMembreco;
      membrojService.getAldonoj().then(function(response) {
          $scope.krommembrecoj = response.data;
      });
  }

  $scope.init2 = function() {
      $scope.init();
      membrojService.getAnecoj($routeParams.id, 1).then(function(response) {
          $scope.membroj = response.data;
      });

      membrojService.getGrupojById($routeParams.id).then(function(response) {
          $scope.grupo = response.data[0];
      });

  }

  $scope.aprobi = function(peto) {
    var data = {
      anecnomo: $scope.grupo.nomo,
      retposxto: peto.retposxto
    };

    membrojService.postAprobi(peto.id, data).then(function(response) {
        $window.location.reload();
    });
  }


  $scope.strip = function(string) {
    if(string == null)
      return string;
    return string.slice(0,10);
  }

});
