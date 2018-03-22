app.service('revuojService', function ($http, $window, config) {
    var service = this;

    service.getRevuoj = getRevuoj;
    service.postRevuon = postRevuon;
    service.getRevuoVolumoj = getRevuoVolumoj;
    service.addVolumon = addVolumon;
    service.postVolumonKovrilbildo = postVolumonKovrilbildo;
    service.postVolumonKvalita = postVolumonKvalita;
    service.postVolumonMalpeza = postVolumonMalpeza;


    function getRevuoj() {
        return $http.get(config.api_url + '/revuoj');
    };


    function postRevuon(data) {
        var req = {
            method: 'POST',
            url: config.api_url + '/revuoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    }

    function addVolumon(revuonId, data){
        var req = {
            method: 'POST',
            url: config.api_url + '/revuoj/' + revuonId + '/volumoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    }


    function getRevuoVolumoj(revuonId) {
        return $http.get(config.api_url + '/revuoj/' + revuonId + '/volumoj');
    }


    function postVolumonMalpeza(volumonId, malpeza) {
        var file = malpeza;
        var uploadUrl = config.api_url + '/revuoj/volumoj/' + volumonId + '/malpeza';
        var fd = new FormData();
        fd.append('file', file);

       return $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined, 'x-access-token': $window.localStorage.getItem('token')}
        });
    }

    function postVolumonKvalita(volumonId, kvalita) {
        var file = kvalita;
        var uploadUrl = config.api_url + '/revuoj/volumoj/' + volumonId + '/kvalita';
        var fd = new FormData();
        fd.append('file', file);

        return $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined, 'x-access-token': $window.localStorage.getItem('token')}
        });
    }

    function postVolumonKovrilbildo(volumonId, kovrilbildo) {
        var file = kovrilbildo;
        var uploadUrl = config.api_url + '/revuoj/volumoj/' + volumonId + '/kovrilbildo';
        var fd = new FormData();
        fd.append('file', file);

        return $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined, 'x-access-token': $window.localStorage.getItem('token')}
        });
    }

    return service;
});