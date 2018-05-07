app.controller('retlistojCtrl', function ($scope, $window, $rootScope, $mdDialog, auth, retlistojService, errorService) {
    $scope.title = "Retlistoj";

    $scope.retlistoj = [];


    $scope.goToAddRetliston = function () {
        $window.location.href = '#!/retlistoj/new';
    };


    $scope.showConfirm = function(ev, nomo, retlistonIndex, retlistonId) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Forviŝi retliston ' + nomo + '?')
            .targetEvent(ev)
            .ok('Forviŝi')
            .cancel('Nuligi');

        $mdDialog.show(confirm).then(function() {
            retlistojService.deleteRetliston(retlistonId).then(function (response) {
                $scope.retlistoj.splice(retlistonIndex, 1)
            }, errorService.error);

        }, function() {
        });
    };

    function getRetlistoj() {
        var success = function (response) {
            $scope.retlistoj = response.data;
        };

        retlistojService.getRetlistoj().then(success, errorService.error);
    };

    function init() {
        getRetlistoj();
        auth.ensalutita();
        $rootScope.menuo = true;
    }


    init();
});