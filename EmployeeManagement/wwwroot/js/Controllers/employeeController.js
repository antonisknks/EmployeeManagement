app.controller("employeeController", ["$scope", "$http", "$timeout", "$q", "$log", "$mdDialog", "Excel", function ($scope, $http, $timeout, $q, $log, $mdDialog,Excel) {



    $scope.cb = {};
    $scope.collected = [];
    $scope.pageSize = 10;
    $scope.pages = 10;
    $scope.employees = {};
    $scope.employeesTmp = {};


    $http.get("api/Skills").then(function (r) {
        $scope.allSkills = r.data;
        $scope.allSkills.forEach(c => c.employeeSkills = [])
    })


    $scope.getEmployees = function () {
        $http.get("api/Employees").then(function (r) {

            $scope.employees = r.data;

            $scope.employees.forEach(c => {
                c.skillSet = [];
                c.employeeSkills.forEach(d => {
                    c.skillSet.push(d.skill.name);
                })
                c.hiringDate = moment(c.hiringDate).format('DD-MM-YYYY');
            })
            $scope.employeesTmp = $scope.employees;
            $scope.pager = $scope.makePager($scope.employeesTmp.length, 0, $scope.pages, $scope.pageSize);
            //re-filter after delete
            $scope.applyFilters();
            $scope.order();
        })

    }
    $scope.getEmployees();


    $scope.GoToEmployee = function (id) {
        window.location.href = '/employeeDetails?r=' + id;
    }


    $scope.DeleteEmployees = function () {
        $scope.collected.forEach(c => {
            $http.delete("api/Employees/" + c.employeeId).then(function (r) {
                $scope.getEmployees();

            })

        })

    }

    $scope.checked = function (e) {
        $scope.collected.push(e)

    };

    $scope.showConfirm = function (ev) {
        var confirm = $mdDialog.confirm()
            .title('Delete Employees')
            .textContent('This change is permanent, do you want to continue?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('OK')
            .cancel('CANCEL');

        $mdDialog.show(confirm).then(function () {
            $scope.DeleteEmployees();
        }, function () {

        });
    };

    $scope.visible = function (i) {
        return i >= ($scope.pager.Current * $scope.pageSize) && i < (($scope.pager.Current + 1) * $scope.pageSize);
    }

    $scope.getPage = function (p) {
        $scope.pager = $scope.makePager($scope.employeesTmp.length, p, $scope.pages, $scope.pageSize);

    }

    $scope.makePager = function (itemCount, currentPage, indexCount, pageSize) {
        var pageCount = Math.floor((itemCount + pageSize - 1) / pageSize);
        if (currentPage >= pageCount)
            currentPage = pageCount - 1;
        var start = currentPage - Math.floor((indexCount - 1) / 2);
        var end = start + indexCount - 1;
        if (start < 0) {
            start = 0;
            end = indexCount - 1;
        }
        if (end >= pageCount) {
            end = pageCount - 1;
            start = end - indexCount + 1;
            if (start < 0) start = 0;
        }

        var ret = [];
        for (var i = start; i <= end; i++)
            ret.push(i);
        return {
            Pages: ret,
            Current: currentPage,
            Count: itemCount
        };
    }

    $scope.applyFilters = function () {
        

        //If you are trying to read this function i'm really sorry
        //I shouldn't have to search and filter in the same function

        //search or filters applyed
        if (($scope.Search && $scope.Search != "") || ($scope.filteredSkills && $scope.filteredSkills.length > 0)) {
            $scope.employeesTmp = [];
            $scope.employeesTmp2 = $scope.employees;//this is always the latest version of $scope.employeesTmp to use for filters

            //search
            if (($scope.Search && $scope.Search != "")) {
                $scope.employees.forEach(c => {
                    if (c.name.toLowerCase().includes($scope.Search.toLowerCase()) || c.surname.toLowerCase().includes($scope.Search.toLowerCase()) /*|| c.hiringDate.includes($scope.Search)*/) {
                        $scope.employeesTmp.push(c);
                    }
                })
                $scope.employeesTmp2 = $scope.employeesTmp;
            }


            //filter
            if ($scope.filteredSkills && $scope.filteredSkills.length > 0) {
                $scope.employeesTmp3 = [];
                $scope.employeesTmp2.forEach(c => {
                    let skillContained = false;
                    c.skillSet.map(c => $scope.filteredSkills.includes(c)).forEach(d => { if (d == true) { skillContained = true } })
                    if (skillContained) {
                        $scope.employeesTmp3.push(c)
                    }
                })
                $scope.employeesTmp = $scope.employeesTmp3;
            }


        }
        else if (!$scope.filteredSkills || !$scope.Search || ($scope.Search == "" && $scope.filteredSkills.length == 0)) {
            $scope.employeesTmp = $scope.employees;
        }

        
        $scope.pager = $scope.makePager($scope.employeesTmp.length, 0, $scope.pages, $scope.pageSize);
    }

    
    $scope.order = function (f) {
        
        $scope.asc = !$scope.asc;
        if (f) {
            if ($scope.asc) {
                $scope.employeesTmp.sort((c, d) => c.hiringDate.split('-')[2] + '-' + c.hiringDate.split('-')[1] + '-' + c.hiringDate.split('-')[0] < d.hiringDate.split('-')[2] + '-' + d.hiringDate.split('-')[1] + '-' + d.hiringDate.split('-')[0] ? -1 : 1);
            }
            else {
                $scope.employeesTmp.sort((c, d) => c.hiringDate.split('-')[2] + '-' + c.hiringDate.split('-')[1] + '-' + c.hiringDate.split('-')[0] < d.hiringDate.split('-')[2] + '-' + d.hiringDate.split('-')[1] + '-' + d.hiringDate.split('-')[0] ? 1 : -1);
            }
        }
        else {
            if ($scope.asc) {
                $scope.employeesTmp.sort((c, d) => c.surname.toLowerCase() < d.surname.toLowerCase() ? -1 : 1);
            }
            else {
                $scope.employeesTmp.sort((c, d) => c.surname.toLowerCase() < d.surname.toLowerCase() ? 1 : -1);
            }
        }
        
    }

    


  
        
            $scope.exportToExcel = function (tableId) { // ex: '#my-table'
                var exportHref = Excel.tableToExcel(tableId, 'WireWorkbenchDataExport');
                $timeout(function () { location.href = exportHref; }, 100); // trigger download
            }
      







}]);