app.service('adminService', function ($http, config, $window) {

    var service = this;

    service.getAdmin = getAdmin;
    service.getAdminrajto = getAdminrajto;
    service.getRajtoj = getRajtoj;
    service.postAdmin = postAdmin;
    service.postRajto = postRajto;
    service.deleteAdmin = deleteAdmin;
    service.updateAdmin = updateAdmin;

    function getAdmin() {
      var req = {
        method: 'GET',
        url: config.api_url + '/admin',
        headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function getAdminrajto(id) {
      var req = {
          method: 'GET',
          url: config.api_url + '/admin/' + id + '/rajtoj',
          headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
     return $http(req)
    }

    function getRajtoj() {
      return $http.get(config.api_url + '/admin/rajtoj');
    }

    function postAdmin(data) {
      var req = {
          method: 'POST',
          url: config.api_url + '/admin',
          data: data,
          headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function postRajto(idAdmin, idRajto) {
      var req = {
        method: 'POST',
        url: config.api_url + '/admin/' + idAdmin + '/rajtoj',
        data: {'idRajto': idRajto},
        headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function deleteAdmin(idAdmin) {
      var req = {
        method: 'DELETE',
        url: config.api_url + '/admin/' + idAdmin,
        headers: {'x-access-token': $window.localStorage.getItem('token')}
      };
      return $http(req);
    }

    function updateAdmin(id, data) {
      var req = {
          method: 'PUT',
          url: config.api_url + '/admin/' + id,
          headers: {'x-access-token': $window.localStorage.getItem('token')},
          data: data
        };
      return $http(req);
    }

   return service;
});
