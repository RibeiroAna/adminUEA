app.controller('volumonCtrl', function ($scope, auth, $rootScope, $routeParams, $mdDialog, $window, errorService, revuojService) {
    $scope.revuonTitolo = $routeParams.titolo;
    $scope.revuonId = $routeParams.id;


    $scope.volumoj = [];

    function getVolumoj() {
        var success = function (response) {
            $scope.volumoj = response.data;
        };

        revuojService.getRevuoVolumoj($routeParams.id).then(success, errorService.error);

        revuojService.getMp3($scope.revuonId).then(function (response) {
            if(response.data !== 'No file found'){
                $scope.mp3Dosiero = response.data;
            }
        }, errorService.error);
    };

    $scope.showAddVolumonDialog = function() {
        $mdDialog.show({
            controller: 'addVolumonCtrl',
            templateUrl: 'components/revuoj/volumon/addVolumon.html',
            bindToController: true,
            locals: {
                revuonId: $routeParams.id
            }
        }).then(function (result) {
            // Function for when hide() of mdDialog is called
            $scope.volumoj.push(result);

        }, function (result) {
            // Function for when cancel() of mdDialog is called
        });
    };

    $scope.updateMp3Dosiero = function () {
        revuojService.postMp3($scope.revuonId, $scope.mySong).then(function (response) {
            $scope.mySong = undefined;
            $window.location.reload();
        })
    };

    var init = function () {
        auth.ensalutita();
        getVolumoj();
        $rootScope.menuo = true;
    };

    init();
});
