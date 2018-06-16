app.controller("aliajgrupojCtrl", function ($scope, $rootScope, $window, $q,
                                            errorService, config, auth, membrojService) {

  $scope.init = function() {
      auth.ensalutita();

      $rootScope.menuo = true;

      config.getConfig("idLaborgrupo").then(function(response) {
        $scope.idLaborgrupo = response.data.idLaborgrupo;
        membrojService.getGrupKat($scope.idLaborgrupo).then(function(response) {
          $scope.laborgrupoj = response.data;
        }, errorService.error);
      });
  }

  $scope.delete = function(id) {
    if(confirm("Ĉu vi certas ke vi volas fari tion? Tio ne povos esti Nuligita")) {
      membrojService.deleteGrupoj(id).then(function(sucess){
          $window.location.reload();
      }, errorService.error);
    }
  }

  $scope.update = function(id, valoro, kampo) {
      var data = {valoro: valoro, kampo: kampo};
      membrojService.updateGrupoj(id, data).then(function(sucess){}, errorService.error);
  }

  $scope.novaKategorio = function() {
    var kat = [];

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
