app.controller('addRetlistojCtrl', function ($scope, $rootScope, $window, auth, retlistojService, errorService) {


    $scope.addRetliston = function () {

        var success = function (response) {
            $window.location.href = '#!/retlistoj';
        };

        retlistojService.postRetliston($scope.retliston).then(success, errorService.error);
    };


    function init() {
        auth.ensalutita();
        $rootScope.menuo = true;
    }


    init();

});