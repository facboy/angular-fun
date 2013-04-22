'use strict';

/* App Module */
(function () {
    var angularFun;
    angularFun = angular.module('angularFun', ['ui.bootstrap', 'chartsExample.directives', 'resourceFun'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/fun1', {templateUrl: 'static/partials/fun1.html', controller: 'Fun1Ctrl'})
                .when('/fun2', {templateUrl: 'static/partials/fun2.html', controller: 'Fun2Ctrl'})
                .otherwise({redirectTo: 'fun1'});
        }])
        .controller('TabsDemoCtrl', function ($scope) {
            $scope.panes = [
                { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
                { title: 'Dynamic Title 2', content: 'Dynamic content 2' }
            ];
        });

    angularFun.controller('NavSearchHttpCtrl', ['$scope', '$http', 'limitToFilter',
        function ($scope, $http, limitToFilter) {
            $scope.findCities = function (cityName) {
                return $http.jsonp("http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK&filter=US&q=" + cityName)
                    .then(function (response) {
                        return limitToFilter(response.data, 15);
                    });
            };
        }]);

    angularFun.controller('NavSearchResourceCtrl', ['$scope', 'autoCompleteCity', '$q', 'limitToFilter',
        function ($scope, autoCompleteCity, $q, limitToFilter) {

            $scope.findCities = function (cityName) {
                var deferred = $q.defer();
                autoCompleteCity.query({q: cityName},
                    function (response) {
                        console.log(response);
                        deferred.resolve(response);
                    },
                    function (response) {
                        console.log(response);
                        deferred.reject(response);
                    });
//            $http.jsonp("http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK &filter=US&q=" + cityName).then(function (response) {
//                return limitToFilter(response.data, 15);
//            });

                return deferred.promise;
            };
        }]);

    angularFun.controller('Fun1Ctrl', function ($scope) {
        $scope.people = [
            { name: 'John Smith', email: 'john@smith.com', phone: '12345' },
            { name: 'Jane Smith', email: 'jane@smith.com', phone: '12346' },
            { name: 'Bob Jane', email: 'bob@jane.com', phone: '12347' },
            { name: 'Ty Remart', email: 'ty@remart.com', phone: '12348' }
        ];
    });

    angularFun.controller('Fun2Ctrl', function ($scope) {
        $scope.basicAreaChart = {
            "title": {
                "text": "Israel love Iran"
            },
            "subtitle": {
                "text": "Source: <a href=\"https://www.facebook.com/israellovesiran\">Israel loves iran on fb</a>"
            },
            "xAxis": {
                "labels": {}
            },
            "tooltip": {},
            "plotOptions": {
                "area": {
                    "pointStart": 1940,
                    "marker": {
                        "enabled": false,
                        "symbol": "circle",
                        "radius": 2,
                        "states": {
                            "hover": {
                                "enabled": true
                            }
                        }
                    }
                }
            },
            "series": [
                {
                    "name": "Israel",
                    "data": [
                        400,
                        194,
                        301,
                        130,
                        300
                    ]
                },
                {
                    "name": "Iran",
                    "data": [
                        123,
                        325,
                        120,
                        300,
                        300
                    ]
                }
            ]
        };
    });
})();
