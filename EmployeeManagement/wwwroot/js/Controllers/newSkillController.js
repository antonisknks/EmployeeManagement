app.controller("newSkillController", ["$scope", "$http", "$timeout", "$q", "$log", "$mdDialog", function ($scope, $http, $timeout, $q, $log, $mdDialog) {

    $scope.creationDate = moment(new Date()).format('DD-MM-YYYY');
   
    $scope.Save = function () {
        if ($scope.name && $scope.description) {
            let skill = {
                Name: $scope.name,
                Description: $scope.description,
                CreationDate: new Date()
            }

            $http.post('api/Skills', skill).then(function (r) {
                if (r.status == 201) {
                    $scope.success = true;
                    $scope.error = false;

                    $scope.name = "";
                    $scope.description = "";
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