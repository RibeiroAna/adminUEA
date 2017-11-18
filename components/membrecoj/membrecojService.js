app.service('membrecoService', function ($http) {
  $http.get(config.api_url + "/grupoj/" + config.idAldonaMembrecgrupo + "/sub").then(
    function(response) {
      $scope.krommembrecoj = response.data;
    });
});
