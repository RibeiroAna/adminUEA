app.service('dissendoService', function ($http, $window, config) {
    var service = this;
    service.sendEmail = sendEmail;



    function sendEmail(data) {
        var req = {
            method: 'POST',
            url: config.api_url + '/dissendoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            data: data
        };

        return $http(req);
    };


    return service;
});