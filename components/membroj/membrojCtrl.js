app.controller("membrojCtrl", function ($scope, $rootScope, $window, $http,
                                        $routeParams, config, auth,
                                        membrojService, errorService) {
  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;
    $scope.renovigtempo = [
      {value:1, text:"por 1 jaro"},
      {value:2, text:"por 2 jaroj"},
      {value: 5, text:"por 5 jaroj"},
      {value: null, text:"dumvive"}];
  }

  $scope.init1 = function() {
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

  $scope.init2 = function() {
      $scope.init();
      membrojService.getAnecoj($routeParams.id, 1).then(function(response) {
          $scope.membroj = response.data;
      }, errorService.error);

      membrojService.getGrupojById($routeParams.id).then(function(response) {
          $scope.grupo = response.data[0];
      }, errorService.error);
  }

  $scope.filtri = function (){
      $scope.membroj = $scope.membroj.filter(function (obj, index){
        return obj.ueakodo == undefined;
      });
    }

  $scope.aprobi = function(peto) {
    var data = {
      anecnomo: $scope.grupo.nomo,
      retposxto: peto.retposxto
    };

    membrojService.postAprobi(peto.id, data).then(function(response) {
        $window.location.reload();
    }, errorService.error);
  }

  $scope.strip = function(string) {
    if(string == null)
      return string;
    return string.slice(0,10);
  }

});
