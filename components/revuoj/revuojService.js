app.service('revuojService', function ($http, $window, config) {
    var service = this;

    service.getRevuoj = getRevuoj;


    function getRevuoj() {
        return $http.get(config.api_url + '/revuoj');
    };

    return service;
});