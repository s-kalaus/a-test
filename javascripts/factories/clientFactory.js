'use strict';

/* global aTest */

aTest.

factory('clientFactory',  ['$resource', function($resource) {

    // MOCK START

    var list = [{
        id: 1,
        name: 'Client-1'
    }, {
        id: 2,
        name: 'Client-2'
    }];

    return {
        list: function(params, onSuccess, onError) {

            return onSuccess({
                success: true,
                data: list
            });
        }
    };
    // MOCK END

    return $resource('/order', {}, {
        list: {
            method: 'GET'
        }
    });
}]);