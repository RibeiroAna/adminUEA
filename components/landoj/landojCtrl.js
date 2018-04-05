app.controller("landojCtrl", function ($scope, $rootScope, $window,
                                       config, auth, landojService, errorService) {

  $scope.init = function() {
    auth.ensalutita();

    $rootScope.menuo = true;
    landojService.getLandoj().then(function(response) {
        $scope.landoj = response.data;
    }, errorService.error);
  }

  $scope.novaLando = function() {
      $scope.lando.finajxoEo = "";
      landojService.postLandoj($scope.lando).then(function(sucess){
          $window.location.reload();
      }, errorService.error);
  }

  $scope.deleteLando = function(idLando) {
    if(confirm("Ĉu vi certas ke vi volas forviŝi tiun landon?" +
               " Tiu ago ne povos esti malfarita!")) {
      landojService.deleteLandoj(idLando).then(function(response){
         $window.location.reload();
      }, errorService.error);
    }
  }

  $scope.ignoreAccents = function (item) {
    if (!$scope.search) return true;
    var objects = [];
    var jsonstr = JSON.stringify(item);
    var parsejson = JSON.parse(jsonstr);
    var searchterm = $scope.search.replace(/[!#$%&'()*+,-./:;?@[\\\]_`{|}~]/g, '');    // skip replace if not required (it removes special characters)
    objects = getNoOfResults(parsejson, searchterm);
    return objects.length > 0;
};

  $scope.updateLando = function(id, valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};
    landojService.updateLandoj(id, data).then(function(sucess){}, errorService.error);
  }

});
