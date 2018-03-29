app.controller('redaktiVolumonCtrl', function ($scope, $window, config, $rootScope, $routeParams, revuojService, errorService) {

    $scope.editEnhavListoMode = false;

    $scope.upload = function () {
        function success(response) {
            $scope.bildo = $scope.file;
            $scope.file = '';
        };

        revuojService.postVolumonKovrilbildo($scope.volumon.id, $scope.file).then(success, errorService.error);
    };

    $scope.cancel = function () {
        $scope.file = '';
    };


    $scope.updateVolumon = function (valoro, kampo) {

        if(kampo === 'enhavlisto'){
            valoro = document.getElementById('enhavlisto-edit').innerHTML;
        }

        var data = {valoro: valoro, kampo: kampo};

        function success(response) {
            $scope.volumon[kampo] = valoro;

            if(kampo === 'enhavlisto'){
                document.getElementById('enhavlisto').innerHTML = valoro;
                $scope.cancelEditEnhavListo();
            }

        }

        revuojService.updateVolumon($scope.volumon.id, data).then(success, errorService.error);
    };


    $scope.editEnhavListo = function () {
        $scope.editEnhavListoMode = true;
        var element = document.querySelector("trix-editor");
        element.editor.insertHTML($scope.volumon.enhavlisto);
    }

    $scope.cancelEditEnhavListo = function () {
        var element = document.querySelector("trix-editor");
        element.editor.getSelectedRange();
        var editorLength = element.editor.getSelectedRange()[0];
        element.editor.setSelectedRange([0, editorLength]);
        element.editor.deleteInDirection("forward");
        $scope.editEnhavListoMode = false;
    };

    var init = function () {
        $rootScope.menuo = true;

        revuojService.getRevuoVolumoj($routeParams.revuonId).then(function (response) {
            response.data.forEach(function (volumon) {
                if(volumon.id.toString() === $routeParams.id){
                    $scope.volumon = volumon;
                    $scope.volumon.eldondato = new Date($scope.volumon.eldondato);
                    $scope.volumon.numeroJaro = parseInt($scope.volumon.numeroJaro);
                    $scope.volumon.numeroEntute = parseInt($scope.volumon.numeroEntute);
                    document.getElementById('enhavlisto').innerHTML = $scope.volumon.enhavlisto;
                }
            })
        }, errorService.error);

        revuojService.getVolumonKovrilbildo($routeParams.id).then(function (response) {
            $scope.bildo = response.data;
        }, errorService.error);


        revuojService.getVolumonKvalita($routeParams.id).then(function (response) {
        })

    };

    init();
});