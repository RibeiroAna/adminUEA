app.controller("landojCtrl", function ($scope, $rootScope, $window,
                                       $http, config, auth, landojService) {

  $scope.init = function() {
    auth.ensalutita();

    if (($window.localStorage.getItem('token') == null) ||
        ($window.localStorage.getItem('token') == 0)) {
      $window.location.href = '#!/login';
    }

    $rootScope.menuo = true;
      landojService.getLandoj().then(function(response) {
          $scope.landoj = response.data;
      });
  }

  $scope.novaLando = function() {
      landojService.postLandoj($scope.lando).then(function(sucess){
          $window.location.reload();
      });
  }

  $scope.deleteLando = function(idLando) {
      landojService.deleteLandoj(idLando).then(function(response){
          if(response.status == '204') {
              $window.location.reload();
          } else {
              window.alert("Okazis eraro en la servilo." +
                  " Provu elsaluti kaj ensaluti denove");
          }
      });
  }

  $scope.updateLando = function(id, valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};

      landojService.updateLandoj(id, data);
  }

});
