 app.controller("menuoCtrl", function ($scope, $rootScope, $window,
                                       errorService, config, auth) {

  $scope.init = function() {
    $scope.uzanto = JSON.parse($window.localStorage.getItem('uzanto'));
    $scope.alert = window.alert;
    $scope.teksto = {};
    function getMenuoMembroj() {
      return   [
        {
          titolo: "Membroj",
          montri: true
        },
        {
          link: "#!/membroj",
          titolo: "Membroj"
        },
        {
          link: "#!/membrecpetoj",
          titolo: "Membrecpetoj"
        }
      ];
    }

    function getMenuoBazaAgordoj() {
      return [
        {
          titolo: "Bazaj agordoj",
          montri: true
        },
        {
          link: "#!/admin",
          titolo: "Administrantoj"
        },
        {
          link: "#!/landoj",
          titolo: "Landoj"
        },
        {
          link: "#!/perantoj",
          titolo: "Perantoj"
        },
        {
          link: "#!/faktemoj",
          titolo: "Faktemoj"
        },
        {
          link:"#!/membrecoj",
          titolo:"Kategorioj kaj kotizoj"
        },
        {
          link: "#!/laborgrupoj",
          titolo: "Laborgrupoj"
        },{
          link: "#!/retlistoj",
          titolo: "Retlistoj"
        }
      ];
    }

    function getMenuoKomunikado() {
      return [
        {
          titolo: "Komunikado",
          montri: true
        },
        {
          link: "#!/revuoj",
          titolo: "Revuoj"
        },
        {
          link: "#!/dissendoj",
          titolo: "Dissendoj"
        }
      ];
    }

    try {
      $scope.menuoMembroj = JSON.parse($window.localStorage.getItem('menuoMembroj'));
      if(!scope.menuoMembroj)
        $scope.menuoMembroj = getMenuoMembroj();
      $scope.menuoBazaAgordoj = JSON.parse($window.localStorage.getItem('menuoBazaAgordoj'));
      if(!$scope.menuoBazaAgordoj)
        $scope.menuoBazaAgordoj = getMenuoBazaAgordoj();
      $scope.menuoKomunikado = JSON.parse($window.localStorage.getItem('menuoKomunikado'));
      if(!$scope.menuoKomunikado)
        $scope.menuoKomunikado = getMenuoKomunikado();
    } catch(err) {
      $scope.menuoMembroj = getMenuoMembroj();
      $scope.menuoBazaAgordoj = getMenuoBazaAgordoj();
      $scope.menuoKomunikado = getMenuoKomunikado();
    };

    $scope.menueroj = [];
    config.getConfig("idAdministranto").then(function(response){
      if($scope.uzanto.permesoj.indexOf(response.data.idAdministranto) > -1) {
        $scope.menueroj.push($scope.menuoBazaAgordoj);
        $scope.menueroj.push($scope.menuoMembroj);
        $scope.menueroj.push($scope.menuoKomunikado);
      }
    }, errorService.error);

   config.getConfig("idJunaAdministranto").then(function(response){
      if($scope.uzanto.permesoj.indexOf(response.data.idJunaAdministranto) > -1) {
         $scope.menueroj.push([{titolo: "Membroj", montri: true },
                               {link: "#!/membroj", titolo: "Membroj"}]);
      }
    }, errorService.error);

    config.getConfig("idKomunikisto").then(function(response){
       if($scope.uzanto.permesoj.indexOf(response.data.idKomunikisto) > -1) {
          $scope.menueroj.push($scope.menuoKomunikado);
       }
     }, errorService.error);
  }

  $scope.selektita = function(index, menuo) {
    for(var i = 0; i < $scope.menueroj.length; i++) {
      for(var j = 1; j < $scope.menueroj[i].length; j++) {
        $scope.menueroj[i][j].ngClass = "";
      }
    }
    menuo[index + 1].ngClass = "selektita";
  }

  $scope.elsaluti = function() {
    auth.elsaluti();
  }

  $scope.sercxi = function() {
    $window.location.href = "#!/membroj/" + $scope.teksto.sercxi;
  }

  $scope.sercxi_enter = function(keyEvent) {
    if (keyEvent.which === 13)
      $scope.sercxi()
  }

  window.onbeforeunload = function() {
    $window.localStorage.setItem('menuoMembroj', JSON.stringify($scope.menuoMembroj));
    $window.localStorage.setItem('menuoBazaAgordoj', JSON.stringify($scope.menuoBazaAgordoj));
    $window.localStorage.setItem('menuoKomunikado', JSON.stringify($scope.menuoKomunikado));
  }

});
