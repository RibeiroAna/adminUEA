app.controller("menuoCtrl", function ($scope, $rootScope, $window, $http, config) {

  $scope.init = function() {
    $scope.uzanto = JSON.parse($window.localStorage.getItem('uzanto'));

    $scope.alert = window.alert;

    $scope.menuoBazaAgordoj =
    [
      {
        titolo: "Bazaj agordoj"
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
      }
    ];

    $scope.menuoMembroj =
    [
      {
        titolo: "Membroj"
      },
      {
        link: "#!/membroj",
        titolo: "Membroj"
      },
      {
        link:"",
        titolo:"Statistikoj"
      }
    ];

    $scope.menuoMembreco =
    [
      {
        titolo: "Membreco"
      },
      {
        link: "#!/membrecpetoj",
        titolo: "Membrecpetoj"
      },
      {
        link:"#!/membrecoj",
        titolo:"Kategorioj kaj kotizoj"
      }
    ];
    $scope.menueroj = [];

    if($scope.uzanto.permesoj.indexOf(config.idAdministranto) > -1) {
      $scope.menueroj.push($scope.menuoBazaAgordoj);
      $scope.menueroj.push($scope.menuoMembreco);
      $scope.menueroj.push($scope.menuoMembroj);
    }

    if($scope.uzanto.permesoj.indexOf(config.idJunaAdministranto) > -1) {
      $scope.menueroj.push($scope.menuoMembroj);
    }
  }

  $scope.elsaluti = function() {
    $window.localStorage.setItem('token', 0);
    $window.localStorage.setItem('uzanto', 0);
    $window.location.reload();
    $window.location.href = '#!/login';
  }

});
