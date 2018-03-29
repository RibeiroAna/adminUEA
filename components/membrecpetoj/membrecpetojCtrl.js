app.controller("membrecpetojCtrl",
function ($scope, $rootScope, $window, $http, $routeParams, $sanitize, config,
          auth, membrojService, errorService) {
  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;
  }

  $scope.init1 = function() {
    $scope.init();
    $scope.bazaMembreco = config.idBazaMembreco;

    config.getConfig("idAldonaMembrecgrupo").then(function(response) {
      $scope.idAldonaMembrecgrupo = response.data.idAldonaMembrecgrupo;
      membrojService.getGrupKat($scope.idAldonaMembrecgrupo).then(function(response) {
        $scope.krommembrecoj = response.data;
      }, errorService.error);
    });

    config.getConfig("idMembrecgrupo").then(function(response) {
      $scope.idMembrecgrupo = response.data.idMembrecgrupo;
      membrojService.getGrupKat($scope.idMembrecgrupo).then(function(response) {
        $scope.membrecgrupoj = response.data;
      }, errorService.error);
    });

    //idJunajGrupoj
    config.getConfig("idJunajGrupoj").then(function(response) {
      $scope.idJunajGrupoj = response.data.idJunajGrupoj;
    }, errorService.error);
  };

  $scope.init2 = function() {
    $scope.init();

    membrojService.getAnecoj($routeParams.id, 0).then(function(response) {
      $scope.anecpetoj = response.data;
    }, errorService.error);

    membrojService.getGrupojById($routeParams.id).then(function(response) {
      $scope.grupo = response.data[0];
    }, errorService.error);
  }

  $scope.aprobi = function(peto) {
    console.log(peto);
    // var data = {kampo: "aprobita", valoro: true};
    //   membrojService.updateAneco(peto.id, data).then(function(sucess){
    //   $window.location.reload();
    // }, errorService.error);
  }

  $scope.forvisxiAnecon = function(peto) {
    if(confirm("Ĉu vi vere volas forviŝi tiun anecon?" +
               " Tiu ago ne povos esti nuligita")) {
         var data = {
           anecnomo: $scope.grupo.nomo,
           retposxto: peto.retposxto
         };

         membrojService.deleteAneco(peto.id, data).then(function(response) {
           $window.location.reload();
         }, errorService.error);
    }
  }

  $scope.strip = function(string) {
    if(string == null)
      return string;
    return string.slice(0,10);
  }
});
