 app.controller("menuoCtrl", function ($scope, $rootScope, $window, $http, config) {

  $scope.init = function() {
    // $scope.uzanto = JSON.parse($window.localStorage.getItem('uzanto'));


    console.log($window.localStorage);

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
      },
      {
        link:"#!/membrecoj",
        titolo:"Kategorioj kaj kotizoj"
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
        link: "#!/membrecpetoj",
        titolo: "Membrecpetoj"
      },
      {
        link:"",
        titolo:"Statistikoj"
      }
    ];

    config.getConfig("idAdministranto").then(function(response){
      if($scope.uzanto.permesoj.indexOf(response.data.idAdministranto) > -1) {
        $scope.menueroj.push($scope.menuoBazaAgordoj);
        $scope.menueroj.push($scope.menuoMembroj);
      }
    });

   config.getConfig("idJunaAdministranto").then(function(response){
      if($scope.uzanto.permesoj.indexOf(response.data.idJunaAdministranto) > -1) {
         $scope.menueroj.push($scope.menuoMembroj);
      }
    });

  }

  $scope.elsaluti = function() {
    $window.localStorage.setItem('token', 0);
    $window.localStorage.setItem('uzanto', 0);
    $window.location.reload();
    $window.location.href = '#!/login';
  }

});
