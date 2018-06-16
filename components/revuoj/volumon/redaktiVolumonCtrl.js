app.controller('redaktiVolumonCtrl', function ($scope, $window, config, $rootScope, $routeParams, revuojService, errorService) {

    $scope.editEnhavListoMode = false;

    $scope.upload = function () {
        function success(response) {
            $scope.bildo = $scope.file;
            $scope.file = '';
            $scope.bildoprogressPercentage = null;
        };

        function event (evt) {
            $scope.bildoprogressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }

        revuojService.postVolumonKovrilbildo($scope.volumon.id, $scope.file).then(success, errorService.error, event);
    };

    $scope.cancel = function () {
        $scope.file = '';
    };

    $scope.downloadFile = function (kampo) {
        if(kampo === 'malpeza'){
            window.open($scope.malpeza);
        } else {
            window.open($scope.kvalita);
        }
    };

    $scope.deleteVolumo = function (idVolumo) {
        revuojService.deleteVolumon(idVolumo);
    }

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

    $scope.updateMp3Dosiero = function () {
        function success(response) {
            $scope.mySong = undefined;
            $scope.mp3progressPercentage = null;
            $window.location.reload();
        }
        function event (evt) {
            $scope.mp3progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }
        revuojService.postMp3($scope.volumon.id, $scope.mySong).then(sucess, errorService.error, event);
    };

    $scope.updateMalpeza = function () {
        function success(response) {
            $window.location.reload();
            $scope.malpezaprogressPercentage = null;
        }
        function event (evt) {
            $scope.malpezaprogressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }
        revuojService.postVolumonMalpeza($scope.volumon.id, $scope.newMalpeza).then(success, errorService.error, event);
    };

    $scope.updateKvalita = function () {
        function success(response) {
            $window.location.reload();
            $scope.kvalitaprogressPercentage = null;
        }
        function event (evt) {
            $scope.kvalitaprogressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }
        revuojService.postVolumonKvalita($scope.volumon.id, $scope.newKvalita).then(success, errorService.error, event);
    }

    $scope.editEnhavListo = function () {
        $scope.editEnhavListoMode = true;
        var element = document.querySelector("trix-editor");
        element.editor.insertHTML($scope.volumon.enhavlisto);
    };

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

        revuojService.getMp3($routeParams.id).then(function (response) {
            if(response.data !== 'No file found'){
                $scope.mp3Dosiero = response.data;
            }
        }, errorService.error);

        revuojService.getVolumonKovrilbildo($routeParams.id).then(function (response) {
            $scope.bildo = response.data;
        }, function(err) {
                $scope.bildo = ''
        });

        revuojService.getVolumonKvalita($routeParams.id).then(function (response) {
            $scope.kvalita = response.data;
        }, function(err) {
                $scope.kvalita = ''
        });

        revuojService.getVolumonMalpeza($routeParams.id).then(function (response) {
            $scope.malpeza = response.data;
        }, function(err) {
                $scope.malpeza = ''
        });

    };

    init();
});
