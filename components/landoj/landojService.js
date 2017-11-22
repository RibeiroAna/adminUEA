app.service('landojService', function ($http, config) {
    var service = this;

    service.getLandoj = getLandoj;

    function getLandoj() {
        return $http.get(config.api_url + '/landoj');
    }
});