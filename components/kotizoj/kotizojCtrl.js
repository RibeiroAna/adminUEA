app.controller("kotizojCtrl", function ($scope, $routeParams, $rootScope, $window,
                                        config, auth, errorService,
                                        kotizojService, landojService) {

  $scope.init = function() {
      auth.ensalutita();

      $rootScope.menuo = true;
      $scope.novKotizo = [];

      kotizojService.getGrupoj($routeParams.id).then(function(response) {
          $scope.grupo = response.data[0];
      }, errorService.error);

      kotizojService.getKotizoj($routeParams.id).then(function (response) {
          $scope.kotizoj= response.data;
          landojService.getLandoj().then(function(response) {
              $scope.landoj = response.data;
          }, errorService.error);
      }, errorService.error);
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

      kotizojService.postKotizoj($routeParams.id, $scope.novKotizo[idLando]).
      then(function(sucess){
          $window.location.reload();
      }, errorService.error);
  }

  $scope.updateKotizo = function(id, valoro, kampo) {
    if(kampo == 'prezo') {
      valoro = valoro * 100;
    }
    if(kampo == 'junaRabato') {
        valoro = valoro * 100;
    }
    var data = {id: id, valoro: valoro, kampo: kampo};

    kotizojService.putKotizoj($routeParams.id, data).then(function(sucess){}, errorService.error);
   }
});
