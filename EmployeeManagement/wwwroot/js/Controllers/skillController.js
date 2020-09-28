app.controller("skillController", ["$scope", "$http", "$httpParamSerializerJQLike", "$mdDialog", function ($scope, $http, $httpParamSerializerJQLike, $mdDialog ) {

    $scope.collected = [];
    
    $scope.getSkills = function () {
        $http.get("api/Skills").then(function (r) {

            $scope.skills = r.data;
            $scope.skills.forEach(c => c.creationDate = moment(c.creationDate).format('DD-MM-YYYY'))

        })
    }
    $scope.getSkills();
        
    $scope.GoToSkill = function (id) {
        window.location.href = '/skillDetails?r=' + id;
    }



    $scope.DeleteSkills = function () {
        $scope.collected.forEach(c => {
            $http.delete("api/Skills/" + c.skillId).then(function (r) {
                $scope.getSkills();
            })
        })

    }

    $scope.checked = function (e) {
        $scope.collected.push(e)

    };

    $scope.showConfirm = function (ev) {
        var confirm = $mdDialog.confirm()
            .title('Delete Skills')
            .textContent('This change is permanent, do you want to continue?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('OK')
            .cancel('CANCEL');

        $mdDialog.show(confirm).then(function () {
            $scope.DeleteSkills();
        }, function () {

        });
    };

}]);