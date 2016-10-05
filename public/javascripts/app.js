// TODO: add the nr of sites to the title or a status div


//  the service
//
var app = angular.module('WebMonitor', []);

// service controller
app.controller('addNewSiteCONTROLLER', ['$scope','$http', function($scope, $http) {
    $scope.submit = function() {

        var data = {
            name: $scope.name,
            url: $scope.url,
            keyword: $scope.keyword
        };

        var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
        };

        //call API to add new site
        $http.post('http://localhost:3000/sites/new', data)
        .success(function (data, status, headers, config) {
            console.log("POST SUCESS : " + data + " " + status);
        })
        .error(function (data, status, headers, config) {
            console.log("POST error : " + data + " " + status);
        });

    };
}]);

app.controller('toggleFORM', ['$scope', function($scope) {
    $scope.toggle = function(){
        var target = angular.element(document.querySelector('form#form_add_new_site'));
        if(target.hasClass('ng-hide')){
            target.removeClass('ng-hide');
        }else{
            target.addClass('ng-hide');
        }
    };
}]);

app.controller('allSitesGET', ['$scope','$http','$rootScope', function($scope, $http, $rootScope) {
    $scope.sites = [];

    $http.get('http://localhost:3000/sites/')
    .success(function(data, status) {
        $scope.sites = data;
        $rootScope.totalSites = data.length;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

    $scope.setStatusColor = function (site) {

        if(site.cur_http_status >= 200 && site.cur_http_status < 300){ //sucess
            // console.log("HTTP Sucess "+site.cur_http_status);
            return { "background-color": "green", "color":"white" };
        }else if (site.cur_http_status >= 300 && site.cur_http_status < 400) { // redirection
            // console.log("HTTP redirection "+site.cur_http_status);
             return { "background-color": "yellow", "color":"white" };
        }else if (site.cur_http_status >= 400 && site.cur_http_status < 500) { // client error
            // console.log("HTTP client error "+site.cur_http_status);
            return { "background-color": "blue", "color":"white" };
        }else if (site.cur_http_status >= 500) { // server error
            // console.log("HTTP server error "+site.cur_http_status);
            return { "background-color": "red", "color":"white" };
        }
    };
}]);
