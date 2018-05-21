app.controller('showMessagesCtrl', function ($scope, $mdDialog, dissendoService, idRetlisto, $sce) {
    $scope.messages = [];

    function init() {
        dissendoService.getEmails(idRetlisto).then(function (response) {
            // response.data[0].dato = new Date(response.data[0].dato);
            $scope.messages = response.data;
            $scope.messages.forEach(function (message) {
                message.teksto = $sce.trustAsHtml(message.teksto);
            })
        });
    };

    init();

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
});