app.service('revuojService', function ($http, $window, config) {
    var service = this;

    service.getRevuoj = getRevuoj;
    service.postRevuon = postRevuon;
    service.getRevuoVolumoj = getRevuoVolumoj;
    service.addVolumon = addVolumon;


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

    return service;
});