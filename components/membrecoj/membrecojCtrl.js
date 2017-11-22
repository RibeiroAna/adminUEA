app.controller("membrecojCtrl", function ($scope, $rootScope, $window, $http, config, auth, membrojService) {

  $scope.init = function() {
      auth.ensalutita();

      $scope.bazaMembreco = config.idBazaMembreco;
      $rootScope.menuo = true;

      membrojService.getAldonoj().then(function(response) {
          $scope.krommembrecoj = response.data;
      });
  }

  $scope.delete = function(id) {
      membrojService.deleteGrupoj(id).then(function(sucess){
          $window.location.reload();
      });
  }

  $scope.update = function(id, valoro, kampo) {
      var data = {valoro: valoro, kampo: kampo};

      membrojService.updateGrupoj(id, data);
  }

  $scope.novaKrommebreco = function() {
      membrojService.postGrupoj($scope.grupo).then(function (response) {
          membrojService.postMembrecoj(response.data.insertId).then(function(sucess) {
              $window.location.reload();
          });
      });
  }

});
