app.controller('printejoCtrl', function ($scope) {

	$scope.checkboxFields = [{'name': 'Tuta nomo'}, 
							{'name': 'UEA-kodo'}, 
							{'name': 'Adreso'}, 
							{'name': 'Postkodo'},
							{'name': 'Lando - FR'},
							{'name': 'Lando - EO'},
							{'name': 'Lando - NL'},
							{'name': 'Lando - EN'},
							{'name': 'Telefono'},
							{'name': 'Retadreso'}
							];

	$scope.grupoj = [{nomo: 'Jefferson benedito', adreso: 'Rua 15 de Janeiro', postkodo: '58345-000', lando: 'Brazil'},
					{nomo: 'Jhon Jhon', adreso: 'Rua 15 de Janeiro', postkodo: '58345-000', lando: 'Brazil'},
					{nomo: 'Jhon Jhon', adreso: 'Rua 15 de Janeiro', postkodo: '58345-000', lando: 'Brazil'},
		{nomo: 'Jhon Jhon', adreso: 'Rua 15 de Janeiro', postkodo: '58345-000', lando: 'Brazil'}];


	$scope.teste = function () {
		html2canvas(document.getElementById('exportthis')).then(function(canvas) {
			var data = canvas.toDataURL();
			var docDefinition = {
				content: [{
					image: data,
					width: 500,
				}]
			};
			pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
		});
	}



});