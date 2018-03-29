app.controller('addVolumonCtrl', function ($scope, $window, config, $rootScope, auth, revuojService, $mdDialog, errorService, revuonId, $http) {
    $scope.volumon = {};

    $scope.addVolumon = function () {
        $scope.volumon.enhavlisto = getTrixInputContent();
        $scope.volumon.eldondato = new Date();

        var success = function (response) {
            $scope.volumon.id = response.data.insertId;
            $mdDialog.hide($scope.volumon);

            revuojService.postVolumonKovrilbildo(response.data.insertId, $scope.getFile('input-kovrilbildo-id'));
            revuojService.postVolumonKvalita(response.data.insertId, $scope.getFile('input-kvalita-id'));
            revuojService.postVolumonMalpeza(response.data.insertId, $scope.getFile('input-malpeza-id'));
        };

        revuojService.addVolumon(revuonId, $scope.volumon).then(success, errorService.error);
    };

    $scope.getFile = function (id) {
        return document.getElementById(id).files[0];
    };

    var getTrixInputContent = function() {
        return document.getElementById('trix').innerHTML;
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
});