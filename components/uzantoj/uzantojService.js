app.service('uzantojService', function ($http, config, $window) {
    var service = this;

    service.getUzantoj = getUzantoj;
    service.updateUzantoj = updateUzantoj;

    function getUzantoj(id) {
        var req = {
            method: 'GET',
            url: config.api_url + '/uzantoj/admin/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
        return $http(req);
    }

    function updateUzantoj(id, data) {
      var req = {
          method: 'PUT',
          url: config.api_url + '/uzantoj/admin/' + id,
          headers: {'x-access-token': $window.localStorage.getItem('token')},
          data: data
      };
      return $http(req);
    }

    return service;
});
