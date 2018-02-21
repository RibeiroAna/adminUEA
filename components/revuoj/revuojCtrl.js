app.controller('revuojCtrl', function ($scope, $window, $http, config, membrojService, $rootScope, auth) {


    var init = function () {
        auth.ensalutita();
        $rootScope.menuo = true;
    };

    init();
});