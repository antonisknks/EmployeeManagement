var app = angular.module('App', ['ngMaterial', 'ngMessages', 'ngRoute'])
    .config(["$routeProvider", "$locationProvider", "$mdIconProvider",  function ($routeProvider, $locationProvider, $mdIconProvider, $default) {
        $routeProvider
            .when('/:view', {
                templateUrl: function (arg) { return 'AngularViews/' + arg.view + '.html'; },
                //resolve: {
                //    Skills: function ($http) {
                //        return $http.get("api/Skills")
                //    }
                //}
            })
            .when('/',{
                templateUrl: 'AngularViews/Home.html'
            })
            .otherwise({
                redirectTo: '/'
            })

        //$mdIconProvider
        //    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
        //    .defaultIconSet('img/icons/sets/core-icons.svg', 24);
    
        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    }]);




app.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
})