app.controller('dissendojCtrl', function ($scope, $rootScope, $window, auth, retlistojService, dissendoService, errorService, $mdDialog) {
    $scope.title = 'Dissendoj';

    function getRetlistoj() {
        function success(response) {
            $scope.retlistoj = response.data;
        }

        retlistojService.getRetlistoj().then(success, errorService.error)
    };

    $scope.showLastEmails = function () {
        $mdDialog.show({
            controller: 'showMessagesCtrl',
            templateUrl: 'components/dissendoj/showMessages.html',
            bindToController: true,
            locals: {
                idRetlisto: $scope.selectedRetliston
            }
        }).then(function (result) {
            console.log(result);
        }, function (result) {
            // Function for when cancel() function of mdDialog is called
        });
    };


    $scope.sendEmail = function () {
        var result = window.confirm('Ĉu vi certas ke vi volas sendi tiun mesaĝon?');

        if(result){
            var uzanto = JSON.parse($window.localStorage.uzanto);

            function success(response) {
/*                $scope.email = {};
                cancelEditEnhavListo();*/
                $window.location.reload();
            }

            $scope.email.teksto = getTrixInputContent();
            $scope.email.dissendanto = uzanto.id;
            $scope.email.idRetlisto = parseInt($scope.selectedRetliston);

            dissendoService.sendEmail($scope.email).then(success, errorService.error);
        }
    };

    var getTrixInputContent = function() {
        return document.getElementById('dissendoEmail').innerHTML;
    };

    var cancelEditEnhavListo = function () {
        var element = document.querySelector("trix-editor");
        element.editor.getSelectedRange();
        var editorLength = element.editor.getSelectedRange()[0];
        element.editor.setSelectedRange([0, editorLength]);
        element.editor.deleteInDirection("forward");
    };

    function init() {
        getRetlistoj();
        auth.ensalutita();
        $rootScope.menuo = true;
    }

    init();
})
