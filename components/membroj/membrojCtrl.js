app.controller("membrojCtrl", function ($scope, $rootScope, $window, $http,
                                        $routeParams, config, auth,
                                        membrojService, errorService, landojService) {
  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;
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
          $scope.cxiujMembroj = {};
          response.data.map(function(e){
                              if($scope.cxiujMembroj[e.id]){
                                $scope.cxiujMembroj[e.id].push(e);
                              } else {
                                $scope.cxiujMembroj[e.id] = [e];}
                            });
          membrojService.getUzantoj().then(function(response) {
            var filterMembroj = function(element) {
              if($scope.cxiujMembroj[element.id]) {
                return true;
              } else {
                return false;
              }
            }
            $scope.membroj = response.data.filter(filterMembroj);
            $scope.copyMembroj = Object.assign($scope.membroj);
            var date = new Date();
            $scope.membrecjaro = date.getFullYear();
            $scope.aldonajFiltriloj();
          }, errorService.error);
        }, errorService.error);

        membrojService.getGrupojById($routeParams.id).then(function(response){
          $scope.membrgrupo = response.data[0];
        }, errorService.error);
      } else {
        membrojService.getUzantoj().then(function(response) {
          $scope.filtrilo = $routeParams.id.substring(2, $routeParams.id.length);
          $scope.membroj = response.data.filter($scope.filter);
          $scope.copyMembroj = Object.assign($scope.membroj);
        }, errorService.error);
      }

      landojService.getLandoj().then(function(response) {
        var landoj = response.data;
        $scope.landoj =  {};
        for (var i = 0; i < landoj.length; i++) {
          $scope.landoj[landoj[i].id] = landoj[i];
        }
    });

    var date = new Date();
    $scope.jaro = date.getFullYear();

    landojService.getInfoPriCxiujLandoj().then(function(response){
      $scope.infoLandoj = {};
      response.data.map(function(e){$scope.infoLandoj[e.alpha2Code.toLowerCase()] = e;});
    });
  }

  $scope.filter = function(element) {
    if(!$scope.filtrilo) {
      return true;
    }

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

  $scope.aldonajFiltriloj = function() {
    $scope.membroj = Object.assign($scope.copyMembroj);

    if($scope.membrecjaro) {
        $scope.membroj = $scope.membroj.filter(function(e){
          var membreco =  $scope.cxiujMembroj[e.id];
          for (var i = 0; i < membreco.length; i++) {
            if($scope.membrecjaro == -1) {
              if(!membreco[i].findato) {
                return true;
              }
            } else {
                var findato = new Date(membreco[i].findato);
                var komencdato = new Date(membreco[i].komencdato);
                var membrecjaro = new Date($scope.membrecjaro + "-12-31");
                if(membreco[i].findato) {
                  if ((findato > membrecjaro) && (komencdato <= membrecjaro)) {
                    return true;
                  }
                } else {
                  if(komencdato <= membrecjaro) {
                    return true;
                  }
               }
            }
            return false;
        }
      });
    }

    if (($scope.landoSelect) && ($scope.landoSelect != "")) {
      var idLando = parseInt($scope.landoSelect);
      $scope.membroj = $scope.membroj.filter(function(e){
        if(e.idLando == idLando){
          return true;
        } else {
          return false;
        }
      });
    }

    if ($scope.naskigxjaro) {
      var naskigxjaro = parseInt($scope.naskigxjaro);
      $scope.membroj = $scope.membroj.filter(function(e){
        var naskigxitago = new Date(e.naskigxtago);
        var eNaskigxjaro = parseInt(naskigxitago.getFullYear());
        if($scope.ekde) {
          if(eNaskigxjaro >= naskigxjaro){
            return true;
          } else {
            return false;
          }
        } else {
          if(eNaskigxjaro == naskigxjaro){
            return true;
          } else {
            return false;
          }
        }
      });
    }
  }

  $scope.toCSV = function () {
      var element = angular.element(document.getElementById("membrotablo"));
    	var table = element[0];
    	var csvString = '';
    	for(var i=0; i<table.rows.length;i++){
    		var rowData = table.rows[i].cells;
    		for(var j=0; j<rowData.length;j++){
    			csvString = csvString + rowData[j].innerText + ",";
    		}
    		csvString = csvString.substring(0,csvString.length - 1);
    		csvString = csvString + "\n";
       }
     	csvString = csvString.substring(0, csvString.length - 1);

      var link = document.createElement('a');
      link.href = 'data:application/octet-stream;base64,'+ btoa(unescape(encodeURIComponent(csvString)));
      link.download = 'membroj.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   }
});
