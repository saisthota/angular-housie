/**
 * Created by saisthota on 10/3/16.
 */

var app = angular.module('housieApp', ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/GenerateTickets', {
            templateUrl: 'partials/tickets.html',
            controller: 'TicketsCtrl'
        })
}]);

app.service('Housie', function() {
        this.generateBoard = function() {
            var tableBody = "<table class='table table-bordered table-'>\n";
            var rowStart = "\n<tr>\n";
            var rowEnd = "\n</tr>";
            var cellId = 0;

            for( var row = 1; row <= 10; row++ ) {
                tableBody += rowStart;

                for( var cell = 1; cell <= 10; cell++ ) {
                    if(cellId==90) {
                        break;
                    }
                    cellId = cellId + 1;
                    tableBody += "<td width='10%' id='ele_"+cellId+"'>"+cellId+"</td>";
                }

                tableBody += rowEnd;
            }
            tableBody += "</table>";
            return tableBody;
        }

        this.drawNumber = function(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        this.testFn = function() {
            console.log("Function call test");
        }

        this.markCell = function(cell) {
            var currentCell = angular.element(document.querySelector('#ele_' + cell))
            currentCell.addClass('alert alert-success');
            this.testFn();
            return;
        }
});


app.controller('HomeCtrl', function($scope, Housie, $sce) {
    $scope.init = function() {
        $scope.board = $sce.trustAsHtml(Housie.generateBoard());

    }

    $scope.draw = function() {
        $scope.currentNumber = Housie.drawNumber(1, 90);
        Housie.markCell($scope.currentNumber);
    }
});
