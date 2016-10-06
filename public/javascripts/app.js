
// server endpoints

var LOCATION = 'http://localhost:3000/sites'
var NEW_POST = LOCATION + '/new';
var GET_ALL = LOCATION + '/';

var app = angular.module('WebMonitor', []);


/*
    API interfacing Angular controller to POST A NEW WEBSITE TO THE SERVER
*/
app.controller('addNewSite', ['$scope','$http', function($scope, $http) {
    $scope.submit = function() {

        var data = {
            name: $scope.name,
            url: $scope.url,
            keyword: $scope.keyword
        };

        //call API to add new site
        $http.post(NEW_POST, data)
        .success(function (data, status) {
            console.log("POST SUCESS : " + data + " " + status);
        })
        .error(function (data, status) {
            console.log("POST error : " + data + " " + status);
        });

    };
}]);

/*
    API interfacing Angular controller to GET ALL WEBSITES FROM DATABASE
*/
app.controller('getAllSites', ['$scope','$http','$rootScope', function($scope, $http, $rootScope) {
    $scope.sites = [];

    $http.get(GET_ALL)
    .success(function(data, status) {
        $scope.sites = data;
        $rootScope.totalSites = data.length;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });

    $scope.setStatusColor = function (site) {
        if(site.cur_http_status >= 200 && site.cur_http_status < 300){ //sucess
            // console.log("DEBUG HTTP Sucess "+site.cur_http_status);
            return { "background-color": "green", "color":"white" };
        }else if (site.cur_http_status >= 300 && site.cur_http_status < 400) { // redirection
            // console.log("DEBUG HTTP redirection "+site.cur_http_status);
             return { "background-color": "yellow", "color":"white" };
        }else if (site.cur_http_status >= 400 && site.cur_http_status < 500) { // client error
            // console.log("DEBUG HTTP client error "+site.cur_http_status);
            return { "background-color": "blue", "color":"white" };
        }else if (site.cur_http_status >= 500) { // server error
            // console.log("DEBUG HTTP server error "+site.cur_http_status);
            return { "background-color": "red", "color":"white" };
        }
    };
}]);


/*
    Controller for BUTTON TO TOGGLE THE FORM VIEW and CHANGE THE ARROW DIRECTION
*/
app.controller('toggleFormView', ['$scope','$sce', function($scope,$sce) {

    //  Since the ng-bind-html is being used in this controller
    //  HTML injection just by setting a $scope variable equal to an "html" lead to
    //  teh followign error:
    //  [$sce:unsafe] Attempting to use an unsafe value in a safe context.
    //
    //  ANGULAR provides $sce or Strict Contextual Escaping
    //  to escape injected html in the app from the scripts

    $scope.messageToggleButton = $sce.trustAsHtml("Monitor new site &#8679;");
    $scope.toggle = function(){
        var form = angular.element(document.querySelector('form#form_add_new_site'));
        var button = angular.element(document.querySelector('button#toggle'));
        if(form.hasClass('ng-hide')){
            button[0].innerHTML = $sce.trustAsHtml("Monitor new site &#8679;");
            form.removeClass('ng-hide');
        }else{
            button[0].innerHTML = $sce.trustAsHtml("Monitor new site &#8681;");
            form.addClass('ng-hide');
        }
    };
}]);
