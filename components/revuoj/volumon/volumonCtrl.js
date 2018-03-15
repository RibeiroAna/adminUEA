app.controller('volumonCtrl', function ($scope, auth, $rootScope, $routeParams, $mdDialog, errorService, revuojService) {
    $scope.revuonTitolo = $routeParams.titolo;

    $scope.volumoj = [];

    function getVolumoj() {
        var success = function (response) {
            $scope.volumoj = response.data;
        };

        revuojService.getRevuoVolumoj($routeParams.id).then(success, errorService.error);
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

    var init = function () {
        auth.ensalutita();
        getVolumoj();
        $rootScope.menuo = true;
    };

    init();
});