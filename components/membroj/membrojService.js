app.service('membrojService', function ($http, config, $window) {
    var service = this;

    service.getGrupKat = getGrupKat;
    service.getAnecoj = getAnecoj;
    service.getGrupojById = getGrupojById;
    service.postGrupoj = postGrupoj;
    service.deleteGrupoj = deleteGrupoj;
    service.updateGrupoj = updateGrupoj;
    service.postAprobi = postAprobi;
    service.postGrupKat = postGrupKat;


    function getGrupKat(idKat) {
        return $http.get(config.api_url + "/grupoj/kategorioj/" + idKat + "/sub");
    }

    function getAnecoj(idGrupo, aprobitaValue) {
        var req = {
            method: 'GET',
            url: config.api_url + '/grupoj/anecoj?idGrupo=' + idGrupo + '&aprobita=' + aprobitaValue,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };

        return $http(req);
    }

    function getGrupojById(id) {
        return $http.get(config.api_url + "/grupoj/" + id);
    }

    function postGrupoj(data) {
        var req = {
            method: 'POST',
            url: config.api_url + '/grupoj',
            data: data,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };

        return $http(req);
    }

    function deleteGrupoj(id) {
        var req = {
            method: 'DELETE',
            url: config.api_url + '/grupoj/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };

        return $http(req);
    }

    function updateGrupoj(id, data) {
        var req = {
            method: 'PUT',
            url: config.api_url + '/grupoj/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    };

    function postAprobi(idPeto, data) {
        var req = {
            method: 'POST',
            data: data,
            url: config.api_url + '/grupoj/anecoj/' + idPeto + '/aprobi',
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };

        return $http(req);
    }

    function postGrupKat(idKat, idGrupo) {
        var req = {
            method: 'POST',
            url: config.api_url + '/grupoj/kategorioj/' + idKat + '/sub/' + idGrupo,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
        return $http(req);
    }


    return service;
});
