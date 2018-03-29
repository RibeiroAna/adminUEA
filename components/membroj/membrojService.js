app.service('membrojService', function ($http, config, $window) {
    var service = this;

    service.getGrupKat = getGrupKat;
    service.getAnecoj = getAnecoj;
    service.getGrupojById = getGrupojById;
    service.getGrupoj = getGrupoj;
    service.postGrupoj = postGrupoj;
    service.deleteGrupoj = deleteGrupoj;
    service.deleteGrupKat = deleteGrupKat;
    service.updateGrupoj = updateGrupoj;
    service.updateAneco = updateAneco;
    service.postGrupKat = postGrupKat;
    service.deleteAneco = deleteAneco;
    service.postAneco = postAneco;
    service.getUzantoj = getUzantoj;

    function getGrupKat(idKat) {
      return $http.get(config.api_url + "/grupoj/kategorioj/" + idKat + "/sub");
    }

    function getUzantoj(){
      var req = {
          method: 'GET',
          url: config.api_url + '/uzantoj',
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function getGrupoj() {
      return $http.get(config.api_url + "/grupoj");
    }

    function postAneco(idGrupo, data) {
      var req = {
          method: 'POST',
          data: data,
          url: config.api_url + '/grupoj/' + idGrupo + '/anoj',
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function deleteAneco(idPeto, data) {
      var req = {
          method: 'DELETE',
          data: data,
          url: config.api_url + '/grupoj/anecoj/' + idPeto,
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function getAnecoj(idGrupo, aprobitaValue) {
      var req = {
          method: 'GET',
          url: config.api_url + '/grupoj/' + idGrupo + '/anoj?aprobita=' + aprobitaValue,
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

    function postGrupKat(idKat, idGrupo) {
      var req = {
          method: 'POST',
          url: config.api_url + '/grupoj/kategorioj/' + idKat + '/sub/' + idGrupo,
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function deleteGrupKat(idGrupo, idKat) {
      var req = {
          method: 'DELETE',
          url: config.api_url + '/grupoj/kategorioj/' + idKat + '/sub/' + idGrupo,
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function updateAneco(idAneco, data) {
      var req = {
        method: 'PUT',
        url: config.api_url + '/grupoj/anecoj/' + idAneco,
        headers: {'x-access-token': $window.localStorage.getItem('token')},
        data: data
      };

      return $http(req);
    }

    return service;
});
