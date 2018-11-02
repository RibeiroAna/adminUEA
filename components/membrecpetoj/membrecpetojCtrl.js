app.controller("membrecpetojCtrl",
function ($scope, $rootScope, $q, auth, membrecpetojService, membrojService, errorService) {
  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;

    membrecpetojService.getAnecoj().then(function(success){
      $scope.anecoj = success.data;
      membrecpetojService.getGxiroj('?aligxo=1').then(function(success) {
        $scope.gxiroj = success.data;
      }, errorService.error);
      
      membrojService.getGrupoj().then(function(success){
        $scope.grupoj = {};
        success.data.map(function(e){$scope.grupoj[e.id] = e;});
      }, errorService.error);

    }, errorService.error);
    $scope.idGxirpropono = 0;
  }

  $scope.trakti = function(gxiro) {
    var data = {kampo: 'traktita', valoro: true};
    membrecpetojService.updateGxiroj(gxiro.id, data).then(function(success){
      var promises = [];
      var data = {kampo: 'aprobita', valoro: true};

      for(var i = 0; i < gxiro.anecoj.length; i++) {
        promises.push(membrojService.updateAneco(gxiro.anecoj[i].id, data));
      }

      $q.all(promises).then(function(success){
        window.alert("Ĝiro sukcese traktita");
        window.location.reload();
      }, errorService.error);

    }, errorService.error);
  }

  $scope.montriTraktitaj = function() {
    var filterGxiroj = function(gxiro) {
      return gxiro.traktita == false;
    }

    $scope.neTraktitaj = true;

    $scope.gxiroj = $scope.gxiroj.filter(filterGxiroj);
  }

  $scope.getFilteredAnecoj = function(gxiro) {
    var filterAnecoj = function(aneco) {
      return aneco.idGxirpropono ==  $scope.idGxirpropono;
    }  
    $scope.idGxirpropono = gxiro.id;
    gxiro.anecoj = $scope.anecoj.filter(filterAnecoj);
  }
});
