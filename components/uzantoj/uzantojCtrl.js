app.controller("uzantojCtrl", function ($scope, $rootScope, $window, $routeParams, $sanitize, $mdDialog,
                                        config, uzantojService, landojService, membrojService, faktemojService,
                                        errorService, auth) {
  $scope.init = function() {
    auth.ensalutita();

    $rootScope.menuo = true;

    faktemojService.getFaktemoj().then(function(response){
      $scope.faktemoj = {}
      $scope.faktemojList = response.data;
      response.data.map(function(elem){$scope.faktemoj[elem.id] = elem.nomo;});
    });

    uzantojService.getUzantoj($routeParams.id).then(function(response) {
      if(response.data[0]) {
        $scope.uzanto = response.data[0];
        $scope.uzanto.naskigxtago = $scope.uzanto.naskigxtago.slice(0,10);
        try {
          $scope.uzanto.familianomo = decodeURIComponent(escape($scope.uzanto.familianomo));
          $scope.uzanto.personanomo = decodeURIComponent(escape($scope.uzanto.personanomo));
          $scope.uzanto.adreso = decodeURIComponent(escape($scope.uzanto.adreso));
        } catch(error) {
          console.error(error);
        }

        landojService.getLandoj($scope.uzanto.idLando).then(function(response){
          $scope.lando = response.data[0];
          landojService.getInfoPriLanda(response.data[0].landkodo).then(function(response) {
            $scope.landInformoj = response.data;
          }, errorService.error);
        }, errorService.error);

        uzantojService.getGrupoj($routeParams.id).then(function(response) {
          $scope.grupoj = {};
          response.data.map(function (elem) {
            elem.komencdato = elem.komencdato.slice(0,10);
            if (elem.findato) {
              elem.findato = elem.findato.slice(0,10);
            }
            if (!$scope.grupoj[elem.id]) {
              if(elem.idFaktemo) {
                elem.faktemoj = [];
                elem.faktemoj.push(elem.idFaktemo);
              }
              $scope.grupoj[elem.id]  = elem;
             } else {
               if(elem.idFaktemo) {
                 $scope.grupoj[elem.id].faktemoj.push(elem.idFaktemo);
               }
              }
            });
        }, errorService.error);

        config.getConfig("idMembrecgrupo").then(function(response) {
          $scope.idMembrecgrupo = response.data.idMembrecgrupo;
          membrojService.getGrupKat($scope.idMembrecgrupo).then(function(response){
            var membrArr = response.data.map(function(elem) {return elem.id})
            $scope.membrecgrupo  = {};
            Object.keys($scope.grupoj).forEach(function(key,index) {
              if(membrArr.indexOf($scope.grupoj[key].idGrupo) > -1) {
                if (($scope.grupoj[key].findato == null) || (new Date($scope.grupoj[key].findato) > new Date())) {
                  $scope.membrecgrupo = $scope.grupoj[key];
                }
              }
            });
            if($scope.membrecgrupo) {
              if($scope.membrecgrupo.findato == null) {
                $scope.gxis = "Dumviva membro";
              } else {
                var finjaro = parseInt($scope.membrecgrupo.findato.slice(0, 4)) - 1;
                $scope.gxis = "Membro ĝis " +  finjaro;
              }
            }
          }, errorService.error);
        });
      } else {
        window.alert("Tiu uzanto ne ekzistas");
        $window.history.back();
      }
    }, errorService.error);

    landojService.getLandoj().then(function(response) {
        $scope.landoj = response.data;
    }, errorService.error);

    uzantojService.elsxutiBildon($routeParams.id).then(
      function(response) {
        if(response.data.indexOf("No file found") > -1) {
          $scope.bildo = 'content/img/profilo.png'
        } else {
          $scope.bildo = response.data;
        }
      },
      function(err) {
        $scope.bildo = 'content/img/profilo.png'
      });

    $scope.titoloj = ["S-ro", "S-rino", "D-ro",
                      "D-rino", "Profesoro", "Profesorino",
                      "Magistro", "Magistrino", "Pastro", "Pastrino"];


    membrojService.getGrupoj().then(
      function(response){
        $scope.cxiujGrupoj = response.data;
      }, errorService.error);
  }

  $scope.upload = function() {
    uzantojService.alsxultiBildon($routeParams.id, $scope.file).then(function (resp) {
      $window.location.reload();
    }, errorService.error, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    });
  };


  $scope.montriDetalojn = function(ev, grupo, element) {
    $scope.elektitaGrupo = grupo;
    $scope.aneco.JSONfaktemoj = [];
    $mdDialog.show({
      contentElement: element,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  $scope.cancel = function() {
     $mdDialog.cancel();
  };

  $scope.updateUzantoj = function(valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};
      uzantojService.updateUzantoj($routeParams.id, data).then(
        function(sucess){
          $window.location.reload();
        }, errorService.error);
  }

  $scope.forvisxiAnecon = function(peto) {
    if(confirm("Ĉu vi vere volas forviŝi tiun anecon?" +
               " Tiu ago ne povos esti nuligita")) {
         var data = {
           anecnomo: peto.nomo,
           retposxto: peto.retposxto
         };

         membrojService.deleteAneco(peto.id, data).then(function(response) {
           $window.location.reload();
         }, errorService.error);
    }
  }

  $scope.forvisxiUzanton = function() {
    var familianomo = prompt("Se vi volas vere foriviŝi tiun uzanton, "
                      + "tajpu ŝian aŭ lian familian nomon", "tajpu");
    if(familianomo == $scope.uzanto.familianomo){
      uzantojService.deleteUzanto($scope.uzanto.id).then(function(sucess){
        $window.location.href = '#!/membroj';
        $window.location.reload()
      }, errorService.error);
    }
  }

  $scope.updateAneco = function(id, valoro, kampo) {
    if((kampo == 'dumviva') && (valoro == true)){
      var data = {kampo: 'findato', valoro: null};
      membrojService.updateAneco(id, data).then(function(sucess){}, errorService.error);
    }
    if((kampo == 'findato') && valoro) {
      var data = {kampo: 'dumviva', valoro: false};
      membrojService.updateAneco(id, data).then(function(sucess){}, errorService.error);
    }
    var data = {kampo: kampo, valoro: valoro};
    membrojService.updateAneco(id, data).then(function(sucess){
      $window.location.reload();
    }, errorService.error);
    $window.location.reload();
  }

  $scope.querySearch  = function (query, element) {
    var results = element.filter(function(obj) {
        if(obj.nomo != null && obj.mallongigilo != null) {
          return obj.nomo.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
          obj.mallongigilo.toLowerCase().indexOf(query.toLowerCase()) != -1;
        } if(obj.nomo != null) {
          return obj.nomo.toLowerCase().indexOf(query.toLowerCase()) != -1;
        } else {
          return obj.id == query;
        }
    });
    return results;
  }

  $scope.postAneco = function() {
    var idGrupo = $scope.aneco.grupo.id;
    if($scope.aneco.dumviva) {
      $scope.aneco.findato = undefined;
    } else {
      if($scope.aneco.findato) {
        $scope.aneco.findato = $scope.aneco.findato.toISOString().slice(0,10);
      } else {
        window.alert("Bonvole, enmetu findaton!");
        return;
      }
    }
    $scope.aneco.faktemoj = [];
    for (var i = 0; i < $scope.aneco.JSONfaktemoj.length; i++) {
      $scope.aneco.faktemoj.push($scope.aneco.JSONfaktemoj[i].id);
    }

    if($scope.aneco.komencdato) {
      $scope.aneco.komencdato = $scope.aneco.komencdato.toISOString().slice(0,10);
    } else {
      window.alert("Bonvole, enmetu komencdaton!");
      return;
    }

    $scope.aneco.idAno = $routeParams.id;
    membrojService.postAneco(idGrupo, $scope.aneco).then(function(sucess){
      $window.location.reload();
    }, errorService.error);
  }

});
