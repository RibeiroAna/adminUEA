app.controller('addRevuojCtrl', function ($scope, revuojService, $mdDialog, errorService) {
    $scope.revuon = {};

    $scope.addRevuon = function () {
        $scope.revuon.fondjaro = parseInt($scope.revuon.fondjaro);

        var success = function (response) {
            $mdDialog.hide($scope.revuon);
        };

        revuojService.postRevuon($scope.revuon).then(success, errorService.error);
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
});