app.service('perantoService', function ($http, $window, config) {
    var service = this;

    service.getPerantoj = getPerantoj;
    service.getPerantojByLando = getPerantojByLando;
    service.postPerantoj = postPerantoj;
    service.updatePerantoj = updatePerantoj;
    service.deletePerantoj = deletePerantoj;



    function getPerantoj() {
        return $http.get(config.api_url + "/perantoj");
    }

    function getPerantojByLando(idLando) {
        return $http.get(config.api_url + "/perantoj?idLando=" + idLando);
    }

    function postPerantoj(data) {
        var req = {
            method: 'POST',
            url: config.api_url + '/perantoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    }

    function updatePerantoj(id, data) {
        var req = {
            method: 'PUT',
            url: config.api_url + '/perantoj/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    }

    function deletePerantoj(id) {
        var req = {
            method: 'DELETE',
            url: config.api_url + '/perantoj/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };

        return $http(req);
    }


    return service;
});