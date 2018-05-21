app.service('dissendoService', function ($http, $window, config) {
    var service = this;
    service.sendEmail = sendEmail;
    service.getEmails = getEmails;



    function getEmails(idRetlisto) {
        var req = {
            method: 'GET',
            url: config.api_url + '/dissendoj',
            headers: {'x-access-token': $window.localStorage.getItem('token')},
            params: {idRetlisto: idRetlisto}
        };

        return $http(req);
    };


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