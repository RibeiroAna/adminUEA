app.controller('abonantojCtrl', function ($scope, $rootScope, $mdDialog, auth, retlistojService, errorService, retlistonId, retlistonNomo) {
    $scope.nomo = retlistonNomo;
    $scope.abonantoj = [];

    function getAbonantoj() {
        function success(response) {
            $scope.abonantoj = response.data;
        }

        retlistojService.getAbonantoj(retlistonId).then(success, errorService.error);
    };


    $scope.postAbonanto = function (abonanto) {
        function success(response) {
            abonanto.id = response.data.insertId;
            $scope.abonantoj.push(abonanto);
            $scope.abonanto = {};
        };

        $scope.abonanto.ekde = new Date();
        $scope.abonanto.formato_html = true;
        $scope.abonanto.kodigxo_utf8 = true;

        if(abonanto.retadreso){
            retlistojService.postAbonanto(retlistonId, abonanto).then(success, errorService.error);
        }
    };


    $scope.cancel = function () {
        $mdDialog.cancel();
    };


    getAbonantoj();

});