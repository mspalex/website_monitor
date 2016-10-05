//
// function MyCtrl($scope){
//     $scope.visible = true;
//     $scope.toggle = function(){
//         $scope.visible = !$scope.visible;
//     };
// }
var myApp = angular.module('MyCtrlDemo', []);

myApp.controller('MyCtrl', ['$scope', function($scope) {
    $scope.visible = true;

    $scope.toggle = function(){
        $scope.visible = !$scope.visible;
    };
}]);
