app.controller('revuojCtrl', function ($scope, $window, config, membrojService, $rootScope, auth, revuojService, $mdDialog) {

    $scope.revuejo = [];

    function getRevuoj() {
        revuojService.getRevuoj().then(function (response) {
            $scope.revuejo = response.data;
        })
    };

    $scope.showAddRevuojDialog = function() {
        $mdDialog.show({
            controller: 'addRevuojCtrl',
            templateUrl: 'components/revuoj/addRevuoj.html',
            bindToController: true
        }).then(function (result) {
            // Function for when the hide() function of mdDialog is called
            $scope.revuejo.push(result);

        }, function (result) {
            // Function for when cancel() function of mdDialog is called
        });
    };

    var init = function () {
        getRevuoj();
        auth.ensalutita();
        $rootScope.menuo = true;
    };

    init();
});