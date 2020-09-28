app.controller("logsController", ["$scope", "$http", "$timeout", "$q", "$log", "$mdDialog", function ($scope, $http, $timeout, $q, $log, $mdDialog) {

    $http.get("api/Logs").then(function (r) {
        $scope.logs = r.data;
        $scope.logs.forEach(c => c.date = moment($scope.logs.date).format('DD-MM-YYYY'))
    })

}]);