app.service('retlistojService', function ($http, config) {
    var service = this;

    service.postRetliston = postRetliston;



    function postRetliston(data) {

        return $http.post(config.api_url + '/dissendoj/retlistoj', data);
    };
});