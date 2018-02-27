app.controller('printejoCtrl', function ($scope, $window, $http, config, membrojService, $rootScope, auth, landojService, errorService, PDFService) {

	$scope.grupoj = [];
	$scope.checkboxFields = [{'name': 'Tuta nomo', selected: true},
							{'name': 'UEA-kodo', selected: false},
							{'name': 'Adreso', selected: true},
							{'name': 'Postkodo', selected: true},
							{'name': 'Lando - EO', selected: true},
							{'name': 'Lando - FR', selected: false},
							{'name': 'Lando - NL', selected: false},
							{'name': 'Lando - EN', selected: false},
							{'name': 'Telefono', selected: false},
							{'name': 'Retadreso', selected: false}
							];

	$scope.uzantoj = {};
	$scope.landoj = {};

	$scope.makePDF = function () {
		html2canvas(document.getElementById('exportthis')).then(function(canvas) {
			var data = canvas.toDataURL();

			PDFService.addImage(data);
		});
	};


	var groupByLando = function (landoj) {
		landoj.forEach(function (lando) {
			$scope.landoj[lando.id] = lando;
			getTranslations(lando.id, lando.landkodo);
		})
	};


	var getTranslations = function (id, landkodo) {
		landojService.getInfoPriLanda(landkodo).then(function (response) {
			$scope.landoj[id].translations = response.data.translations;
			$scope.landoj[id].translations.en = response.data.name;
		}, errorService);

	};

	var getGrupoj = function () {
		membrojService.getAllGrupoj().then(function (response) {
			$scope.grupoj = response.data;

			$scope.grupoj.forEach(function (grupoj) {
				membrojService.getMembroj(grupoj.id).then(function (res) {
					$scope.uzantoj[grupoj.nomo] = res.data;
				});
			});
		});
	};

	var init = function () {
		auth.ensalutita();

      	$rootScope.menuo = true;

		landojService.getLandoj().then(function (response) {
			groupByLando(response.data);
			getGrupoj();

		}, errorService);

	};

	function saveTextAsFile (data, filename){

		if(!data) {
			console.error('Console.save: No data')
			return;
		}

		if(!filename) filename = 'console.json'

		var blob = new Blob([data], {type: 'text/plain'}),
			e    = document.createEvent('MouseEvents'),
			a    = document.createElement('a')
		// FOR IE:

		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveOrOpenBlob(blob, filename);
		}
		else{
			var e = document.createEvent('MouseEvents'),
				a = document.createElement('a');

			a.download = filename;
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
			e.initEvent('click', true, false, window,
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);
		}
	}


	$scope.expFile = function() {

		var content = document.getElementById('exportthis');

		var fileText = content.textContent || content.innerText;
		var fileName = "membroj.txt";
		saveTextAsFile(fileText, fileName);
	}



	init();

});