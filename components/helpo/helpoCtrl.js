app.controller("helpoCtrl", function ($scope, $rootScope, auth) {
        $scope.init = function() {
            auth.ensalutita();
            $rootScope.menuo = true;
        }
});