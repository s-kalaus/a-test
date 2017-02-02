'use strict';

/* global aTest */

aTest.

factory('clientService', ['clientFactory', function(clientFactory) {

    var Service = {};

    Service.getList = getList;

    function getList(params, callback) {

        return clientFactory.list(params, function(result) {

            if (!result.success) {
                return callback(result);
            }

            return callback(null, result.data);
        }, callback);
    }

    return Service;
}]);