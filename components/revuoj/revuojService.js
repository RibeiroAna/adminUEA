app.service('revuojService', function ($http, $window, Upload, config) {
    var service = this;

    service.getRevuoj = getRevuoj;
    service.postRevuon = postRevuon;
    service.getRevuoVolumoj = getRevuoVolumoj;
    service.deleteVolumo = deleteVolumo;
    service.addVolumon = addVolumon;
    service.postVolumonKovrilbildo = postVolumonKovrilbildo;
    service.postVolumonKvalita = postVolumonKvalita;
    service.postVolumonMalpeza = postVolumonMalpeza;
    service.getVolumonKovrilbildo = getVolumonKovrilbildo;
    service.getVolumonKvalita = getVolumonKvalita;
    service.getVolumonMalpeza = getVolumonMalpeza;
    service.updateVolumon = updateVolumon;
    service.postMp3 = postMp3;
    service.getMp3 = getMp3;


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
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/' + revuonId + '/volumoj',
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function deleteVolumo(volumoID) {
        var req = {
            method: 'DELETE',
            url: config.api_url + '/revuoj/volumoj/' + volumoID,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
        return $http(req);
    }

    function postVolumonMalpeza(volumonId, file) {
        var uploadUrl = config.api_url + '/revuoj/volumoj/' + volumonId + '/malpeza';
        return Upload.upload({
            url: uploadUrl,
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: {file: file}
        });
    }

    function postVolumonKvalita(volumonId, file) {
        var uploadUrl = config.api_url + '/revuoj/volumoj/' + volumonId + '/kvalita';
        return Upload.upload({
            url: uploadUrl,
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: {file: file}
        });
    }

    function postVolumonKovrilbildo(volumonId, file) {
        var uploadUrl = config.api_url + '/revuoj/volumoj/' + volumonId + '/bildo';
        return Upload.upload({
            url: uploadUrl,
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: {file: file}
        });
    }

    function postMp3(volumonId, mp3) {
        var uploadUrl = config.api_url + '/revuoj/volumoj/' + volumonId + '/mp3';
        return Upload.upload({
            url: uploadUrl,
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: {file: file}
        });
    };

    function getMp3(volumonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/volumoj/' + volumonId + '/mp3',
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    };

    function getVolumonKovrilbildo(volumonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/volumoj/' + volumonId + '/bildo',
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function getVolumonKvalita(volumonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/volumoj/' + volumonId + '/kvalita',
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function getVolumonMalpeza(volumonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/revuoj/volumoj/' + volumonId + '/malpeza',
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
        return $http(req);

    }

    function updateVolumon(volumonId, data) {
        var req = {
            method: 'PUT',
            url: config.api_url + '/revuoj/volumoj/' + volumonId,
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    }

    return service;
});
