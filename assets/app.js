/**
 * Created by saisthota on 10/3/16.
 */

var app = angular.module('housieApp', ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
}]);

app.controller('HomeCtrl', function($scope) {

    $scope.init = function() {
        //Initialize 10x10 table here
    }
});