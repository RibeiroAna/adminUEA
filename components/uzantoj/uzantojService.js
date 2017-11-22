app.service('uzantojService', function ($http, config, $window) {
    var service = this;


    service.getUzantoj = getUzantoj;



    function getUzantoj(id) {
        var req = {
            method: 'GET',
            url: config.api_url + '/uzantoj/' + id,
            headers: {'x-access-token': $window.localStorage.getItem('token')}
        };

        return $http(req);
    }

    return service;
});