app.service('revuojService', function ($http, $window, config) {
    var service = this;

    service.getRevuoj = getRevuoj;
    service.postRevuon = postRevuon;


    function getRevuoj() {
        return $http.get(config.api_url + '/revuoj');
    };


    function postRevuon(data) {
        return $http.post(config.api_url + '/revuoj', data);
    }

    return service;
});