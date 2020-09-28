app.controller("newEmployeeController", ["$scope", "$http", "$timeout", "$q", "$log", "$mdDialog", function ($scope, $http, $timeout, $q, $log, $mdDialog) {

    $scope.fields = false;
    //$scope.hiringDateTxt = $scope.hiringDate;


    $scope.init = function () {
        $http.get("api/Skills").then(function (r) {
            $scope.allSkills = r.data;
            $scope.allSkills.forEach(c => c.employeeSkills = [])
        })
    }
    $scope.init();




    $scope.Save = function () {

        if ($scope.name && $scope.surname && $scope.hiringDate) {

            let newEmp = {};
            if ($scope.selectedSkills) {
                newEmp = {
                    Name: $scope.name,
                    Surname: $scope.surname,
                    HiringDate: $scope.hiringDate,
                    SkillsetUpdate: new Date(),
                    EmployeeSkills: []
                }
            } else {
                newEmp = {
                    Name: $scope.name,
                    Surname: $scope.surname,
                    HiringDate: $scope.hiringDate,
                    EmployeeSkills: []
                }
            }

            if ($scope.selectedSkills) {
                $scope.allSkills.forEach(c => {
                    if ($scope.selectedSkills.includes(c.name)) {
                        newEmp.EmployeeSkills.push(c);
                    }
                })
            }


            $http.post("api/Employees", newEmp).then(function (r) {
                if (r.status == 201) {
                    $scope.success = true;
                    $scope.error = false;
                    $scope.fields = false;

                    $scope.name = "";
                    $scope.surname = ""
                    $scope.hiringDate = ""
                    $scope.selectedSkills = []
                }
                else {
                    $scope.error = true;
                    $scope.success = false;
                    $scope.fields = false;
                }

            })
            $scope.fields = false;
        }
        else {
            $scope.fields = true;
            $scope.success = false;
            $scope.error = false;
        }

    }




    $scope.newSkill = function (ev) {


        $mdDialog.show({
            scope: $scope.$new(),
            controller: 'modalCreateSkillController',
            templateUrl: 'AngularViews/modalCreateSkill.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen
        })
            .then(function () { },
                function (r) {
                    $scope.init();
                });

    }



}]);