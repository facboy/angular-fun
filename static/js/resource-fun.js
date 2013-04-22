angular.module('resourceFun', ['ngResource'])
    .factory('cityInterceptor', ['$q', function ($q) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
                if (response.headers()['content-type'] === "application/json; charset=utf-8") {
                    // Validate response if not ok reject
                    var data = examineJSONResponse(response); // assumes this function is available

                    if (!data)
                        return $q.reject(response);
                }
                return response;
            }, function (response) {
                // do something on error
                return $q.reject(response);
            });
        };
    }])
    .config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push('cityInterceptor');
    })
    .factory('autoCompleteCity', ['$resource', function($resource) {
        return $resource('http://gd.geobytes.com/AutoCompleteCity',
            {callback: 'JSON_CALLBACK', filter: 'US'},
            {'query': {method: 'JSONP', isArray: true}}
        );
    }]);
