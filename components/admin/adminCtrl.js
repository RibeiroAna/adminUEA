app.controller("adminCtrl", function ($scope, $rootScope, $window,
                                      $http, config, auth) {

  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;

    var reqAd = {
      method: 'GET',
      url: config.api_url + '/admin',
      headers: {'x-access-token': $window.localStorage.getItem('token')}
    };
    $http(reqAd).then(function(response) {
      $scope.administrantoj = response.data;
      angular.forEach($scope.administrantoj, function(value, key){
        req = {
            method: 'GET',
            url: config.api_url + '/admin/' + value.id + '/rajtoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')}
       };
       $http(req).then(
        function sucess(response) {
          value.rajtoj = response.data;
        });
      });
    });




    $http.get(config.api_url + '/admin/rajtoj').then(function(response) {
      $scope.rajtoj = response.data;
    });
  }

  $scope.novaAdmin = function(){
    var req = {
        method: 'POST',
        url: config.api_url + '/admin',
        data: $scope.admin,
        headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
    $http(req).then(
      function(sucess){
        for(var i = 0; i < $scope.rajtoj.length; i++) {
           if($scope.rajtoj[i].elektita) {
             req = {
               method: 'POST',
               url: config.api_url + '/admin/' + sucess.data.insertId + '/rajtoj',
               data: {'idRajto': $scope.rajtoj[i].id},
               headers: {'x-access-token': $window.localStorage.getItem('token')}
             };
             $http(req).then(
               function(sucess) {
                 $scope.eraro = "";
                 $window.location.reload();
               });
          }
        }
     }).catch(function (response) {
        $scope.eraro = "Okazis eraro en via provo. Bonvole, certigu ke la \
                        uzantnomo ankoraŭ ne ekzistas.\
                        Provu ankaŭ elsaluti kaj ensaluti denove."
     });
  }

  $scope.deleteAdmin = function(idAdmin) {
    if($scope.administrantoj.length <= 1) {
      window.alert("Estas bezonata almenaŭ 1 administranto en la sistemo");
      return;
    }

    var req = {
      method: 'DELETE',
      url: config.api_url + '/admin/' + idAdmin,
      headers: {'x-access-token': $window.localStorage.getItem('token')}
    };
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

  $scope.updateAdmin = function(id, valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};
    var req = {
        method: 'PUT',
        url: config.api_url + '/admin/' + id,
        headers: {'x-access-token': $window.localStorage.getItem('token')},
        data: data
      };
      $http(req);
  }

});
