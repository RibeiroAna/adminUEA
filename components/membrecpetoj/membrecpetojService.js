app.service('membrecpetojService', function ($http, config, $window) {
    var service = this;

    service.getGxiroj = getGxiroj;
    service.getAnecoj = getAnecoj;
    service.updateGxiroj = updateGxiroj;

    function getGxiroj(filter){
        var req = {
            method: 'GET',
            url: config.api_url + '/gxirpropono' + filter,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
        return $http(req);
    }

    function getAnecoj() {
        var req = {
            method: 'GET',
            url: config.api_url + '/grupoj/anecoj/gxiroj',
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
        return $http(req);
    }

    function updateGxiroj(id, data) {
        var req = {
            method: 'PUT',
            url: config.api_url + '/gxirpropono/' + id,
            data: data,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
        return $http(req);
    }

    return service;
});