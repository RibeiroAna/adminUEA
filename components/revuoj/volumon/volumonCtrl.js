app.controller('volumonCtrl', function ($scope, auth, $rootScope, $routeParams, errorService, revuojService) {
    $scope.revuonTitolo = $routeParams.titolo;

    $scope.volumoj = [];


    function getVolumoj() {
        var success = function (response) {
            console.log(response);
            $scope.volumoj = response.data;
        };

        revuojService.getRevuoVolumoj($routeParams.id).then(success, errorService.error);
    };

    var init = function () {
        auth.ensalutita();
        getVolumoj();
        $rootScope.menuo = true;
    };

    init();
});