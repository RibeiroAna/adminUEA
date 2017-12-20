app.controller("membrecojCtrl", function ($scope, $rootScope, $window,
                                          errorService, config, auth, membrojService) {

  $scope.init = function() {
      auth.ensalutita();

      $rootScope.menuo = true;

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

  }

  $scope.delete = function(id) {
      membrojService.deleteGrupoj(id).then(function(sucess){
          $window.location.reload();
      }, errorService.error);
  }

  $scope.update = function(id, valoro, kampo) {
      var data = {valoro: valoro, kampo: kampo};
      membrojService.updateGrupoj(id, data).then(function(sucess){}, errorService.error);
  }

  $scope.novaKategorio = function() {
    var kat = [];
    if($scope.baza == 1) {
      kat.push($scope.idMembrecgrupo);
    } else {
      kat.push($scope.idAldonaMembrecgrupo);
    }

    if($scope.tejo == 1) {
      kat.push($scope.idJunajGrupoj);
    }

    membrojService.postGrupoj($scope.grupo).then(function (response) {
        var promises = [];
        for(var i = 0; i < kat.length; i++) {
          promises.push(membrojService.postGrupKat(kat[i], response.data.insertId));
        }
        $q.all(promises).then(function(sucess){}, errorService.error);
        $window.location.reload();
    });
  }

});
