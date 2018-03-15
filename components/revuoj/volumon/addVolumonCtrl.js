app.controller('addVolumonCtrl', function ($scope, $window, config, $rootScope, auth, revuojService, $mdDialog, errorService, revuonId) {
    $scope.volumon = {};

    $scope.addVolumon = function () {
        $scope.volumon.enhavlisto = getTrixInputContent();
        $scope.volumon.eldondato = new Date();

        var success = function (response) {
            $scope.volumon.id = response.data.insertId;
            $mdDialog.hide($scope.volumon);
        };

        revuojService.addVolumon(revuonId, $scope.volumon).then(success, errorService.error);
    };

    var getTrixInputContent = function() {
        return document.getElementById('trix').innerHTML;
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
});