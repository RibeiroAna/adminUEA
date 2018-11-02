app.controller("adminCtrl", function ($scope, $rootScope, $window, $q,
                                      config, auth, adminService, errorService) {

  $scope.init = function() {
    auth.ensalutita();
    $rootScope.menuo = true;

    adminService.getAdmin().then(function(response) {
      $scope.administrantoj = response.data;
      angular.forEach($scope.administrantoj, function(value, key){
        adminService.getAdminrajto(value.id).then(function(response) {
           value.rajtoj = response.data;
        }, errorService.error);
      });
    }, errorService.error);

    adminService.getRajtoj().then(function(response) {
      $scope.rajtoj = response.data;
    }, errorService.error);
  }

  $scope.novaAdmin = function() {
    adminService.postAdmin($scope.admin).then(
      function(sucess){
        var promises = [];
        for(var i = 0; i < $scope.rajtoj.length; i++) {
           if($scope.rajtoj[i].elektita) {
             promises.push(
               adminService.postRajto(sucess.data.insertId, $scope.rajtoj[i].id));
             console.log(promises);
          }
        }

        $q.all(promises).then(function(data) {
         $window.location.reload();
        }, errorService.error);
     }, errorService.error);
  }

  $scope.deleteAdmin = function(idAdmin) {
    if($scope.administrantoj.length <= 1) {
      window.alert("Estas bezonata almenaŭ 1 administranto en la sistemo");
      return;
    }
    adminService.deleteAdmin(idAdmin).then(
      function(response){
         $window.location.reload();
       }, errorService.error);
  }

  $scope.updateAdmin = function(id, valoro, kampo) {
    var data = {valoro: valoro, kampo: kampo};
    adminService.updateAdmin(id, data).
        then(function(sucess){}, errorService.error);
  }

});
