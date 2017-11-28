app.controller("membrecojCtrl", function ($scope, $rootScope, $window, $http,
                                          config, auth, membrojService) {

  $scope.init = function() {
      auth.ensalutita();

      $rootScope.menuo = true;

      config.getConfig("idAldonaMembrecgrupo").then(function(response) {
        $scope.idAldonaMembrecgrupo = response.data.idAldonaMembrecgrupo;
        membrojService.getGrupKat(  $scope.idAldonaMembrecgrupo).then(function(response) {
          $scope.krommembrecoj = response.data;
        });
      });

      config.getConfig("idMembrecgrupo").then(function(response) {
        $scope.idMembrecgrupo = response.data.idMembrecgrupo;
        membrojService.getGrupKat($scope.idMembrecgrupo).then(function(response) {
          $scope.membrecgrupoj = response.data;
        });
      });

      //idJunajGrupoj
      config.getConfig("idJunajGrupoj").then(function(response) {
        $scope.idJunajGrupoj = response.data.idJunajGrupoj;
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
        for(var i = 0; i < kat.length; i++) {
          membrojService.postGrupKat(kat[i], response.data.insertId);
        }
        $window.location.reload();
    });
  }

});
