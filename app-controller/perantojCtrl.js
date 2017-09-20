app.controller("perantojCtrl", function ($scope, $rootScope, $window, $http, config) {

  $scope.init = function() {
    if (($window.localStorage.getItem('token') == null) ||
        ($window.localStorage.getItem('token') == 0)) {
      $window.location.href = '#!/login';
    }

    $rootScope.menuo = true;

    $http.get(config.api_url + "/landoj").then(function(response) {
        $scope.landoj = response.data;
    });

    $http.get(config.api_url + "/perantoj").then(function(response) {
        $scope.perantoj = response.data;
    });

    $scope.peranto = {}
  }

  $scope.getPerantoj = function() {
    var req = config.api_url + "/perantoj?idLando=" + $scope.lando.id;
    $http.get(req).then(function(response) {
        $scope.perantoj = response.data;
    });
  }

  $scope.deletePeranto = function(id) {
    var req = {
        method: 'DELETE',
        url: config.api_url + '/perantoj/' + id,
        headers: {'x-access-token': $window.localStorage.getItem('token')}
      }

   $http(req).then(
     function(response){
       if(response.status == '204') {
        $window.location.reload();
      } else {
        window.alert("Okazis eraro en la servilo." +
                     " Provu elsaluti kaj ensaluti denove");
      }
   });
 }


 $scope.novaPeranto = function() {
  $scope.peranto.idLando = $scope.peranto.lando.id;
  var req = {
      method: 'POST',
      url: config.api_url + '/perantoj',
      headers: {'x-access-token': $window.localStorage.getItem('token')},
      data: $scope.peranto
    }

   $http(req).then(
     function(sucess){
         $window.location.reload();
     });
 }

 $scope.updatePeranto = function(id, valoro, kampo) {
   var data = {valoro: valoro, kampo: kampo};
   var req = {
       method: 'PUT',
       url: config.api_url + '/perantoj/' + id,
       headers: {'x-access-token': $window.localStorage.getItem('token')},
       data: data
     }
     $http(req);
 }
});
