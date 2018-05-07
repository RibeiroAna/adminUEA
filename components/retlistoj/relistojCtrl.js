app.controller('retlistojCtrl', function ($scope, $window, $rootScope, auth, retlistojService, errorService) {
    $scope.title = "Retlistoj";

    $scope.retlistoj = [];


    $scope.goToAddRetliston = function () {
        $window.location.href = '#!/retlistoj/new';
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