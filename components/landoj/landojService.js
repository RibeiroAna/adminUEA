app.service('landojService', function ($http, config, $window) {
    var service = this;

    service.getLandoj = getLandoj;
    service.postLandoj = postLandoj;
    service.updateLandoj = updateLandoj;
    service.deleteLandoj = deleteLandoj;

    function getLandoj() {
        return $http.get(config.api_url + '/landoj');
    }

    function postLandoj(data) {
        var req = {
            method: 'POST',
            url: config.api_url + '/landoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };
        return $http(req);
    }

    function updateLandoj(id, data) {
        var req = {
            method: 'PUT',
            url: config.api_url + '/landoj/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    }

    function deleteLandoj(idLando) {
        var req = {
            method: 'DELETE',
            url: config.api_url + '/landoj/' + idLando,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
        return $http(req);
    }

    return service;
});
