app.controller('dissendojCtrl', function ($scope, $rootScope, $window, auth) {
    $scope.title = 'Dissendoj';



    function init() {
        auth.ensalutita();
        $rootScope.menuo = true;
    }

    init();
})