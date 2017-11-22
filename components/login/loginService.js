app.service('loginService', function($http, config, $window){
	var service = this;

	service.doEnsaluti = doEnsaluti;
	service.getAgordita = getAgordita;


	function doEnsaluti(data){
		return $http.post(config.api_url + '/admin/ensaluti', data);
	}

	function getAgordita(){
		return $http.get(config.api_url + '/admin/agordita');
	}


	return service;
});