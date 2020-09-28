app.controller("modalCreateSkillController", ["$scope", "$http", "$timeout", "$q", "$log", "$mdDialog", function ($scope, $http, $timeout, $q, $log, $mdDialog) {

    $scope.modalCreationDate = moment(new Date()).format('DD-MM-YYYY');

    $scope.Save = function () {
        if ($scope.modalName && $scope.modalDescription) {
            let skill = {
                Name: $scope.modalName,
                Description: $scope.modalDescription,
                CreationDate: new Date()
            }

            $http.post('api/Skills', skill).then(function (r) {
                if (r.status == 201) {
                    $scope.success = true;
                    $scope.error = false;

                    $scope.modalName = "";
                    $scope.modalDescription = "";
                    $scope.hiringDate = moment(new Date()).format('DD-MM-YYYY');
                }
                else {
                    $scope.error = true;
                    $scope.success = false;
                }

            })



            $scope.fields = false;
        }
        else {
            $scope.fields = true;
            $scope.error = false;
            $scope.success = false;
        }
    }

}]);