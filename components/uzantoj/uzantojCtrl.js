app.controller("uzantojCtrl", function ($scope, $rootScope, $window, $mdDialog, $routeParams, $sanitize,
                                        config, uzantojService, landojService, membrojService,
                                        errorService, auth) {
  $scope.init = function() {
    auth.ensalutita();

    $rootScope.menuo = true;

    uzantojService.getUzantoj($routeParams.id).then(function(response) {
      if(response.data[0]) {
        $scope.uzanto = response.data[0];
        $scope.uzanto.naskigxtago = $scope.uzanto.naskigxtago.slice(0,10);
        landojService.getLandoj($scope.uzanto.idLando).then(function(response){
          $scope.lando = response.data[0];
          landojService.getInfoPriLanda(response.data[0].landkodo).then(function(response) {
            $scope.landInformoj = response.data;
          }, errorService.error);
        }, errorService.error);

        uzantojService.getGrupoj($routeParams.id).then(function(response) {
          $scope.grupoj = response.data;
          for (var i = 0; i < $scope.grupoj.length; i++) {
            $scope.grupoj[i].komencdato = $scope.grupoj[i].komencdato.slice(0,10);
            if($scope.grupoj[i].findato)
                $scope.grupoj[i].findato = $scope.grupoj[i].findato.slice(0,10);
          }
        }, errorService.error);
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
        $scope.bildo = response.data;
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

  $scope.updateUzantoj = function(valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};
    if(kampo == 'retposxto') {
      var data2 = {valoro: valoro, kampo: "uzantnomo"};
      uzantojService.updateUzantoj($routeParams.id, data2).then(
        function(sucess){
          uzantojService.updateUzantoj($routeParams.id, data).then(
            function(sucess){
              $window.location.reload();
            }, errorService.error);
        }, errorService.error);
    } else {
      uzantojService.updateUzantoj($routeParams.id, data).then(
        function(sucess){
          $window.location.reload();
        }, errorService.error);
    }
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
  }

  $scope.montriDetalojn = function(ev, grupo, element) {
    $scope.elektitaGrupo = grupo;
    $mdDialog.show({
      contentElement: element,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  $scope.querySearch  = function (query) {
    var results = $scope.cxiujGrupoj.filter(function(obj) {
        // console.log(obj);
        // return
        if(obj.nomo != null && obj.mallongigilo != null) {
          return obj.nomo.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
          obj.mallongigilo.toLowerCase().indexOf(query.toLowerCase()) != -1;
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

  $scope.cancel = function() {
     $mdDialog.cancel();
   };

});
