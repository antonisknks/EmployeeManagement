app.controller("skillDetailsController", ["$scope", "$http", "$timeout", "$q", "$log", "$mdDialog", function ($scope, $http, $timeout, $q, $log, $mdDialog) {

    let id = window.location.search.split('=')[1];

    $scope.init = function () {
        $http.get("api/Skills/" + id).then(function (r) {
            $scope.skill = r.data;
            $scope.skill.creationDate = moment($scope.skill.creationDate).format('DD-MM-YYYY');
            $scope.name = $scope.skill.name;
            $scope.description = $scope.skill.description;

        })
    }

    $scope.init();

    $scope.onSwitchChange = function (on) {
        if (on) {
            $scope.removable = !$scope.removable;
        }
        else {
            $scope.init();
            $scope.removable = !$scope.removable;
        }
    }

    $scope.Save = function () {

        //Till insert view create
        if ($scope.skill.creationDate == "Invalid date") {
            $scope.skill.creationDate = new Date();
        }

        $scope.data = {
            SkillId: $scope.skill.skillId,
            Name: $scope.name,
            Description: $scope.description,
            CreationDate: $scope.skill.creationDate
        }

        $http.put("api/Skills/" + $scope.skill.skillId, $scope.data).then(function (r) {
            $scope.init();
        })
    }


    $scope.DeleteEmployee = function () {
        $http.delete("api/Skills/" + $scope.skill.skillId).then(function (r) {
            window.location.href = '/skill';
        })
    }


    $scope.showConfirm = function (ev) {
        var confirm = $mdDialog.confirm()
            .title('Delete Skill')
            .textContent('This change is permanent, do you want to continue?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('OK')
            .cancel('CANCEL');

        $mdDialog.show(confirm).then(function () {
            $scope.DeleteEmployee();
        }, function () {

        });
    };


}]);