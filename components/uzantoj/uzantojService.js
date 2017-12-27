app.service('uzantojService', function ($http, $window, Upload, config) {
    var service = this;

    service.getUzantoj = getUzantoj;
    service.updateUzantoj = updateUzantoj;
    service.alsxultiBildon = alsxultiBildon;
    service.elsxutiBildon = elsxutiBildon;

    function getUzantoj(id) {
        var req = {
            method: 'GET',
            url: config.api_url + '/uzantoj/admin/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
        return $http(req);
    }

    function alsxultiBildon(id, file) {
      return Upload.upload({
          url: config.api_url + '/uzantoj/admin/' + id + '/bildo',
          headers: {'x-access-token': $window.localStorage.getItem('token')},
          data:{file: file}
      });
    }

    function elsxutiBildon(id) {
      var req = {
          method: 'GET',
          url: config.api_url + '/uzantoj/admin/' + id + '/bildo',
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
