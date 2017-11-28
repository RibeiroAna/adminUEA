app.service('kotizojService', function ($http, config, $window) {

    var service = this;

    service.getGrupoj = getGrupoj;
    service.getKotizoj = getKotizoj;
    service.postKotizoj = postKotizoj;
    service.putKotizoj = putKotizoj;

    function getGrupoj(id) {
        return $http.get(config.api_url + '/grupoj/' + id);
    }

    function getKotizoj(id){
        return $http.get(config.api_url + '/grupoj/' + id + '/kotizoj');
    }

    function postKotizoj(grupojId, data) {
        var req = {
            method: 'POST',
            url: config.api_url + "/grupoj/" + grupojId + "/kotizoj",
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    }

    function putKotizoj(grupojId, data) {
        var req = {
            method: 'PUT',
            url: config.api_url + "/grupoj/" + grupojId + "/kotizoj",
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    }

    return service;
});
