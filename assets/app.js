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

    this.generateTickets = function() {
        var tickets = "";
        for(var t=0;t<6;t++) {
            var arr = [
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["", "", "", "", ""]
            ];
            for(var i=0;i<3;i++) {
                for(var j=0;j<5;j++) {
                    var r = Math.round(Math.random()  * (90 - 1) + 1);
                    debugger;
                    if(!this.isNumberInTicket(arr, r)) {
                        arr[i][j] = r;
                    } else {
                        arr[i][j] = Math.round(Math.random()  * (90 - 1) + 1);
                    }
                }
            }
            var table = "<table class='table table-bordered>";
            for (var i = 0; i < 3; i++) {
                table += "<tr>";
                for (var j = 0; j < 5; j++) {
                    table += "<td id='" + i + "_block_" + j + "'>" + arr[i][j] + "</td>";
                }
                table += "</tr>";
            }
            table += "</table>";
            tickets += table;
        }
        return tickets;
    }

    this.isNumberInTicket = function(arr, n) {
        for(var i=0;i<3;i++) {
            for(var j=0; j<5; j++) {
                if(arr[i][j] === n) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
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

app.controller('TicketsCtrl', function($scope, Housie, $sce) {
    $scope.init = function() {
        $scope.tickets = $sce.trustAsHtml(Housie.generateTickets());
    }
});
