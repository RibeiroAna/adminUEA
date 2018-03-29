app.controller('redaktiVolumonCtrl', function ($scope, $window, config, $rootScope, $routeParams, revuojService, errorService) {

    $scope.upload = function () {
        function success(response) {
            $scope.bildo = $scope.file;
            $scope.file = '';
        };

        revuojService.postVolumonKovrilbildo($scope.volumon.id, $scope.file).then(success, errorService.error);
    };

    $scope.cancel = function () {
        $scope.file = '';
    };


    $scope.updateVolumon = function (valoro, kampo) {
        var data = {valoro: valoro, kampo: kampo};

        function success(response) {
            $scope.volumon[kampo] = valoro;
        }

        revuojService.updateVolumon($scope.volumon.id, data).then(success, errorService.error);
    }

    var init = function () {
        $rootScope.menuo = true;

        revuojService.getRevuoVolumoj($routeParams.revuonId).then(function (response) {
            response.data.forEach(function (volumon) {
                if(volumon.id.toString() === $routeParams.id){
                    $scope.volumon = volumon;
                    $scope.volumon.eldondato = new Date($scope.volumon.eldondato);
                }
            })
        }, errorService.error);

        revuojService.getVolumonKovrilbildo($routeParams.id).then(function (response) {
            $scope.bildo = response.data;
        }, errorService.error);


        revuojService.getVolumonKvalita($routeParams.id).then(function (response) {
        })

    };

    init();
});