app.service('retlistojService', function ($http, $window, config) {
    var service = this;

    service.postRetliston = postRetliston;
    service.getRetlistoj = getRetlistoj;

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

    return service;
});