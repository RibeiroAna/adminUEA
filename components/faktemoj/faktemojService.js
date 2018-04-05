app.service('faktemojService', function ($http, config, $window) {
    var service = this;

    service.getFaktemoj = getFaktemoj;
    service.postFaktemoj = postFaktemoj;
    service.updateFaktemoj = updateFaktemoj;
    service.deleteFaktemoj = deleteFaktemoj;

    function getFaktemoj(id) {
      var url = config.api_url + '/faktemoj';
      if(id){
        url = config.api_url + '/faktemoj?id=' + id;
      }
      return $http.get(url);
    }

    function postFaktemoj(data) {
        var req = {
            method: 'POST',
            url: config.api_url + '/faktemoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };
        return $http(req);
    }

    function updateFaktemoj(id, data) {
        var req = {
            method: 'PUT',
            url: config.api_url + '/faktemoj/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    }

    function deleteFaktemoj(idFaktemo) {
        var req = {
            method: 'DELETE',
            url: config.api_url + '/faktemoj/' + idFaktemo,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };
        return $http(req);
    }

    return service;
});
