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
          titolo: "Membrlistoj"
        }
      ];
    }

    function getMenuoFinancoj() {
      return [
        {
          titolo: "Financoj",
          montri: true
        },
        {
          link: "#!/aligxoj",
          titolo: "Retaj aliĝoj"
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

    function getMenuoFinancoj() {
      return [
        {
          titolo: "Financoj",
          montri: true
        },
        {
          link: "#!/membrecpetoj",
          titolo: "Reta Aliĝilo"
        }
      ]
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
      $scope.menuoKomunikado = JSON.parse($window.localStorage.getItem('menuoFinancoj'));

    } catch(err) {
      $scope.menuoMembroj = getMenuoMembroj();
      $scope.menuoBazaAgordoj = getMenuoBazaAgordoj();
      $scope.menuoKomunikado = getMenuoKomunikado();
      $scope.menuoFinancoj = getMenuoFinancoj();
    };

    $scope.menueroj = [];
    config.getConfig("idAdministranto").then(function(response){
      if($scope.uzanto.permesoj.indexOf(response.data.idAdministranto) > -1) {
        $scope.sercxi = true;
        $scope.menueroj.push($scope.menuoBazaAgordoj);
        $scope.menueroj.push($scope.menuoMembroj);
        $scope.menueroj.push($scope.menuoKomunikado);
        $scope.menueroj.push($scope.menuoFinancoj)
      }
    }, errorService.error);

   config.getConfig("idJunaAdministranto").then(function(response){
      if($scope.uzanto.permesoj.indexOf(response.data.idJunaAdministranto) > -1) {
        $scope.sercxi = true;
        $scope.menueroj.push([{titolo: "Membroj", montri: true }, 
        {link: "#!/membroj", titolo: "Membroj"}]);
      }
    }, errorService.error);

    config.getConfig("idKomunikisto").then(function(response){
       if($scope.uzanto.permesoj.indexOf(response.data.idKomunikisto) > -1) {
        $scope.sercxi = false;
        $scope.menueroj.push($scope.menuoKomunikado);
       }
    }, errorService.error);

    config.getConfig("idFinancoj").then(function(response){
      console.log($scope.uzanto.permesoj);
      if($scope.uzanto.permesoj.indexOf(response.data.idFinancoj) > -1) {
       $scope.sercxi = true;
       $scope.menueroj.push($scope.menuoFinancoj);
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

  $rootScope.sercxiFunc = function() {
    $window.location.href = "#!/membroj/q=" + $scope.teksto.sercxi;
  }

  $rootScope.sercxi_enter = function(keyEvent) {
    if (keyEvent.which === 13)
      $scope.sercxiFunc()
  }

  window.onbeforeunload = function() {
    $window.localStorage.setItem('menuoMembroj', JSON.stringify($scope.menuoMembroj));
    $window.localStorage.setItem('menuoBazaAgordoj', JSON.stringify($scope.menuoBazaAgordoj));
    $window.localStorage.setItem('menuoKomunikado', JSON.stringify($scope.menuoKomunikado));
    $window.localStorage.setItem('menuoFinancoj', JSON.stringify($scope.menuoFinancoj));

  }

});
