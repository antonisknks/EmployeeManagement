app.controller("employeeDetails", ["$scope", "$http", "$timeout", "$q", "$log", "$mdDialog", function ($scope, $http, $timeout, $q, $log, $mdDialog) {

    let id = window.location.search.split('=')[1];

    //for delete skills slider!
    $scope.selectedSkills = [];
    

    $scope.init = function () {
        $http.get("api/Employees/" + id).then(function (r) {

            $scope.employee = r.data;

            //Calendar starts with value the hiringDate else the Current date
            //$scope.calendar = $scope.employee.hiringDate ? $scope.employee.hiringDate : new Date();
            //debugger;

            //the fields get initialized for when update is on
            $scope.surname = $scope.employee.surname;
            $scope.name = $scope.employee.name;
            $scope.calendar = new Date($scope.employee.hiringDate);
            $scope.employee.skillSet = [];

            $scope.employee.employeeSkills.forEach(c => {
                $scope.employee.skillSet.push(c.skill.name);
            })

            $scope.employee.hiringDate = moment($scope.employee.hiringDate).format('DD-MM-YYYY');
            $scope.employee.skillsetUpdate = moment($scope.employee.skillsetUpdate).format('DD-MM-YYYY');


            //Helps to find the skill to remove and add
            $scope.employeeTmp = angular.copy($scope.employee);

            $http.get("api/Skills").then(function (r) {
                $scope.allSkills = r.data;
                $scope.allSkills.forEach(c => c.employeeSkills = [])

                //remove employee's skills from allskills. It needs debug after all features done!
                //$scope.emSkills = [];
                //$scope.employee.employeeSkills.forEach(c => $scope.emSkills.push(c.skill))
                //$scope.emSkills;
                //$scope.allSkills.filter(c =>!$scope.emSkills.includes(c))
                //debugger;
            })

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

    //remove skill
    $scope.onModelChange = function (em) {

        let toremove = $scope.employeeTmp.skillSet.filter(c => !em.includes(c));
        let final=$scope.employeeTmp.employeeSkills.filter(c => c.skill.name == toremove)[0];

        
        $http.delete("api/EmployeeSkills/" + final.employeeId + '/' + final.skillId).then(function (r) {
            $scope.employeeTmp.skillSet = $scope.employeeTmp.skillSet.filter(c => em.includes(c));


            //SkillsetUpdate
            $scope.data = {
                EmployeeId: $scope.employee.employeeId,
                Surname: $scope.employee.surname,
                Name: $scope.employee.name,
                SkillsetUpdate: new Date(),
                HiringDate: $scope.employee.hiringDate
            }


            $http.put("api/Employees/" + $scope.employee.employeeId, $scope.data).then(function (r) {
                
            })


        })
        

    };

    $scope.Save = function () {
        if ($scope.selectedSkills && $scope.selectedSkills.length > 0) {

            //Take the skill object searching by skill's name
            $scope.toAdd = [];
            $scope.allSkills.forEach(c => {
                if ($scope.selectedSkills.includes(c.name)) {
                    $scope.toAdd.push(c)
                }
            })

            //Remove the skills employee already has
            $scope.final = [];
            $scope.toAdd.forEach(c => {
                if (!$scope.employee.skillSet.includes(c.name)) {
                    $scope.final.push(c)
                }

            })

            //Add skill
            $scope.final.forEach(c => {

                $http.post("api/EmployeeSkills/" + $scope.employee.employeeId + '/'+c.skillId).then(function (r) {
                   
                })

            })

            $scope.data = {
                EmployeeId: $scope.employee.employeeId,
                Surname: $scope.surname,
                Name: $scope.name,
                SkillsetUpdate: new Date(),
                HiringDate: $scope.calendar
            }

            
            $http.put("api/Employees/" + $scope.employee.employeeId, $scope.data).then(function (r) {
                $scope.init();
            })
            
        }
        else {

            
            $scope.data = {
                EmployeeId: $scope.employee.employeeId,
                Surname: $scope.surname,
                Name: $scope.name,
                HiringDate: $scope.calendar
            }
            
            $http.put("api/Employees/" + $scope.employee.employeeId, $scope.data).then(function (r) {
                $scope.init();
            })

        }
        
    }

    $scope.DeleteEmployee = function () {
        $http.delete("api/Employees/" + $scope.employee.employeeId).then(function (r) {
            window.location.href = '/employee';
        })
    }


    $scope.showConfirm = function (ev) {
        var confirm = $mdDialog.confirm()
            .title('Delete Employee')
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










