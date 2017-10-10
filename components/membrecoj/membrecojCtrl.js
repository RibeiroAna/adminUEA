app.controller("membrecojCtrl", function ($scope, $rootScope, $window, $http, config, auth) {

  $scope.init = function() {
    auth.ensalutita();

    $scope.bazaMembreco = config.idBazaMembreco;
    $rootScope.menuo = true;

    $http.get(config.api_url + "/grupoj/membrecoj/aldonoj").then(
      function(response) {
        $scope.krommembrecoj = response.data;
      });
  }

  $scope.delete = function(id) {
      var req = {
          method: 'DELETE',
          url: config.api_url + '/grupoj/' + id,
          headers: {'x-access-token': $window.localStorage.getItem('token')}
        }

     $http(req).then(
       function(sucess){
          $window.location.reload();
        });
    }

    $scope.update = function(id, valoro, kampo) {
      var data = {valoro: valoro, kampo: kampo};
      var req = {
          method: 'PUT',
          url: config.api_url + '/grupoj/' + id,
          headers: {'x-access-token': $window.localStorage.getItem('token')},
          data: data
        }
        $http(req);
    }

  $scope.novaKrommebreco = function() {
    var req = {
        method: 'POST',
        url: config.api_url + '/grupoj',
        data: $scope.grupo,
        headers: {'x-access-token': $window.localStorage.getItem('token')}
      };

    $http(req).then(function(sucess){
      var req = {
          method: 'POST',
          url: config.api_url + '/grupoj/membrecoj/aldonoj/' + sucess.data.insertId,
          headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
      $http(req).then(function(sucess) {
        $window.location.reload();
      });
    });
  }

});
