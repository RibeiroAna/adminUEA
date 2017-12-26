app.controller("landojCtrl", function ($scope, $rootScope, $window,
                                       config, auth, landojService, errorService) {

  $scope.init = function() {
    auth.ensalutita();

    if (($window.localStorage.getItem('token') == null) ||
        ($window.localStorage.getItem('token') == 0)) {
      $window.location.href = '#!/login';
    }

    $rootScope.menuo = true;
    landojService.getLandoj().then(function(response) {
        $scope.landoj = response.data;
    }, errorService.error);
  }

  $scope.novaLando = function() {
      landojService.postLandoj($scope.lando).then(function(sucess){
          $window.location.reload();
      }, errorService.error);
  }

  $scope.deleteLando = function(idLando) {
    if(confirm("Ĉu vi certas ke vi volas forviŝi tiun landon?" +
               " Tiu ago ne povos esti malfarita!")) {
      landojService.deleteLandoj(idLando).then(function(response){
         $window.location.reload();
      }, errorService.error);
    }
  }

  $scope.updateLando = function(id, valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};
    landojService.updateLandoj(id, data).then(function(sucess){}, errorService.error);
  }

});
