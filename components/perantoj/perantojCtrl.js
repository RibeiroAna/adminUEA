app.controller("perantojCtrl", function ($scope, $rootScope, $window,
                                         errorService, config, auth,
                                        landojService, perantoService) {

  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;

      landojService.getLandoj().then(function(response) {
          $scope.landoj = response.data;
      }, errorService.error);

      perantoService.getPerantoj().then(function(response) {
          $scope.perantoj = response.data;
      }, errorService.error);

    $scope.peranto = {}
  }

  $scope.getPerantoj = function() {
      perantoService.getPerantojByLando($scope.lando.id).then(function(response) {
          $scope.perantoj = response.data;
      }, errorService.error);
  }

  $scope.deletePeranto = function(id) {
      perantoService.deletePerantoj(id).then(function(response){
          if(response.status == '204') {
              $window.location.reload();
          } else {
              window.alert("Okazis eraro en la servilo." +
                  " Provu elsaluti kaj ensaluti denove");
          }
      }, errorService.error);
 }


 $scope.novaPeranto = function() {
     $scope.peranto.idLando = $scope.peranto.lando.id;
     perantoService.postPerantoj($scope.peranto).then(function(sucess){
         $window.location.reload();
     }, errorService.error);
 }

 $scope.updatePeranto = function(id, valoro, kampo) {
     var data = {valoro: valoro, kampo: kampo};
     perantoService.updatePerantoj(id, data).then(function(sucess){}, errorService.error);
 }
});
