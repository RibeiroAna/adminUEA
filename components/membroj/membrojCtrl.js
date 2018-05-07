app.controller("membrojCtrl", function ($scope, $rootScope, $window, $http,
                                        $routeParams, config, auth,
                                        membrojService, errorService, landojService) {
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

      if($routeParams.id.indexOf("q=") == -1) {
        membrojService.getAnecoj($routeParams.id, 1).then(function(response) {
          $scope.membroj = response.data;
        }, errorService.error);
      } else {
        membrojService.getUzantoj().then(function(response) {
          // membroj = response.data;
          $scope.filtrilo = $routeParams.id.substring(2, $routeParams.id.length);
          $scope.membroj = response.data.filter($scope.filter);
          console.log($scope.membroj);
        }, errorService.error);
      }

      landojService.getLandoj().then(function(response) {
        var landoj = response.data;
        $scope.landoj =  {};
        for (var i = 0; i < landoj.length; i++) {
          $scope.landoj[landoj[i].id] = landoj[i].radikoEo;
        }
      });
  }

  $scope.filter = function(element) {
    element.tutaNomo = element.personanomo + element.familianomo;
    try {
      var string =
      decodeURIComponent(escape(element.tutaNomo)).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    } catch(error) {
      var string = element.tutaNomo.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    var filter = $scope.filtrilo.split(" ");
    var isTrue = true;
    for (var i = 0; i < filter.length; i++) {
       var f = filter[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
       if(string.indexOf(f) > -1){
         isTrue = isTrue && true;
       } else {
         isTrue = false;
       }
     }
     if(isTrue){
       return isTrue;
     } else {
       var f = $scope.filtrilo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
       string = Object.values(element).toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
       if(string.indexOf(f) > -1){
         return true;
       } else {
         return false;
       }
     }
  }

  $scope.escape = function(string) {
   try {
     return decodeURIComponent(escape(string));
   } catch(error) {
     return string;
   }
  }

  $scope.strip = function(string) {
    if(string == null)
      return string;
    return string.slice(0,10);
  }

});
