'use strict';

/* global aTest */

aTest.

factory('orderService', ['orderFactory', function(orderFactory) {

    var Service = {};

    Service.getList = getList;
    Service.getOrder = getOrder;
    Service.create = create;
    Service.update = update;
    Service.remove = remove;

    function getList(params, callback) {

        return orderFactory.list(params, function(result) {

            if (!result.success) {
                return callback(result);
            }

            return callback(null, result.data);
        }, callback);
    }

    function getOrder(params, callback) {

        return orderFactory.show(params, function(result) {

            if (!result.success) {
                return callback(result);
            }

            return callback(null, result.data);
        }, callback);
    }

    function create(params, callback) {

        return orderFactory.create(params, function(result) {

            if (!result.success) {
                return callback(result);
            }

            return callback();
        }, callback);
    }

    function update(params, callback) {

        return orderFactory.update(params, function(result) {

            if (!result.success) {
                return callback(result);
            }

            return callback();
        }, callback);
    }

    function remove(params, callback) {

        return orderFactory.remove(params, function(result) {

            if (!result.success) {
                return callback(result);
            }

            return callback();
        }, callback);
    }

    return Service;
}]);