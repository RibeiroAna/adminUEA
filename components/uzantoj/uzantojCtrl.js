app.controller("uzantojCtrl", function ($scope, $rootScope, $window,
                                        $routeParams, config, uzantojService,
                                        landojService, errorService, auth) {
  $scope.init = function() {
    auth.ensalutita();

    $rootScope.menuo = true;

    uzantojService.getUzantoj($routeParams.id).then(function(response) {
      if(response.data[0]) {
        $scope.uzanto = response.data[0];
        $scope.uzanto.naskigxtago = $scope.uzanto.naskigxtago.slice(0,10);
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
  }

  $scope.upload = function () {
    uzantojService.alsxultiBildon($routeParams.id, $scope.file).then(function (resp) {
      $window.location.reload();
    }, errorService.error, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        $scope.progress = 'progress: ' + progressPercentage + '% ';
    });
  };

  $scope.updateUzantoj = function(valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};
    if(kampo == 'retposxto') {
      var data2 = {valoro: valoro, kampo: "uzantnomo"};
      uzantojService.updateUzantoj($routeParams.id, data2).then(
        function(sucess){
          $window.location.reload();
        }, errorService.error);
    }
    uzantojService.updateUzantoj($routeParams.id, data).then(
      function(sucess){
        $window.location.reload();
      }, errorService.error);
  }
});
