app.controller('retlistojCtrl', function ($scope, $window, $rootScope, auth) {
    $scope.title = "Retlistoj";




    function init() {
        auth.ensalutita();
        $rootScope.menuo = true;
    }


    init();
});