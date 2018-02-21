app.controller('revuojCtrl', function ($scope, $window, $http, config, membrojService, $rootScope, auth, revuojService) {

    $scope.revuejo = [];


    function getRevuoj() {
        revuojService.getRevuoj().then(function (response) {
            $scope.revuejo = response.data;
        })
    };

    var init = function () {
        auth.ensalutita();
        $rootScope.menuo = true;
    };

    init();
});