app.controller("perantojCtrl", function ($scope, $rootScope, $window,
                                         $http, config, auth, landojService, perantoService) {

  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;

      landojService.getLandoj().then(function(response) {
          $scope.landoj = response.data;
      });

      perantoService.getPerantoj().then(function(response) {
          $scope.perantoj = response.data;
      });

    $scope.peranto = {}
  }

  $scope.getPerantoj = function() {
      perantoService.getPerantojByLando($scope.lando.id).then(function(response) {
          $scope.perantoj = response.data;
      });
  }

  $scope.deletePeranto = function(id) {
      perantoService.deletePerantoj(id).then(function(response){
          if(response.status == '204') {
              $window.location.reload();
          } else {
              window.alert("Okazis eraro en la servilo." +
                  " Provu elsaluti kaj ensaluti denove");
          }
      });
 }


 $scope.novaPeranto = function() {
     $scope.peranto.idLando = $scope.peranto.lando.id;
     perantoService.postPerantoj($scope.peranto).then(function(sucess){
         $window.location.reload();
     });
 }

 $scope.updatePeranto = function(id, valoro, kampo) {
     var data = {valoro: valoro, kampo: kampo};
     perantoService.updatePerantoj(id, data);
 }
});
