app.service('retlistojService', function ($http, $window, config) {
    var service = this;

    service.postRetliston = postRetliston;
    service.getRetlistoj = getRetlistoj;
    service.deleteRetliston = deleteRetliston;
    service.postAbonanto = postAbonanto;
    service.getAbonantoj = getAbonantoj;
    service.removeAbonanto = removeAbonanto;

    function postRetliston(data) {
        var req = {
            method: 'POST',
            url: config.api_url + '/dissendoj/retlistoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    };

    function getRetlistoj() {
        return $http.get(config.api_url + '/dissendoj/retlistoj');
    };


    function deleteRetliston(id) {
        var req = {
            method: 'DELETE',
            url: config.api_url + '/dissendoj/retlistoj/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };

        return $http(req);
    };


    function postAbonanto(retlistonId, data) {
        var req = {
            method: 'POST',
            url: config.api_url + '/dissendoj/retlistoj/' + retlistonId + '/abonantoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    };

    function removeAbonanto(retlistonId, abonantonId) {
        var req = {
            method: 'DELETE',
            url: config.api_url + '/dissendoj/retlistoj/' + retlistonId + '/abonantoj/' + abonantonId,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };

        return $http(req);
    }

    function getAbonantoj(retlistonId) {
      var req = {
          method: 'GET',
          url: config.api_url + '/dissendoj/retlistoj/' + retlistonId + '/abonantoj/',
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    return service;
});
