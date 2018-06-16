app.controller("faktemojCtrl", function ($scope, $rootScope, $window,
                                       config, auth, faktemojService, errorService) {

  $scope.init = function() {
    auth.ensalutita();

    $rootScope.menuo = true;
    faktemojService.getFaktemoj().then(function(response) {
        $scope.faktemoj = response.data;
    }, errorService.error);
  }

  $scope.novaFaktemo = function() {
      faktemojService.postFaktemoj($scope.faktemo).then(function(sucess){
          $window.location.reload();
      }, errorService.error);
  }

  $scope.deleteFaktemo = function(idFaktemo) {
    if(confirm("Ĉu vi certas ke vi volas forviŝi tiun landon?" +
               " Tiu ago ne povos esti Nuligita!")) {
      faktemojService.deleteFaktemoj(idFaktemo).then(function(response){
         $window.location.reload();
      }, errorService.error);
    }
  }

  $scope.updateFaktemo = function(id, valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};
    faktemojService.updateFaktemoj(id, data).then(function(sucess){}, errorService.error);
  }

});
