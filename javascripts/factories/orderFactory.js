'use strict';

/* global aTest, _ */

aTest.

factory('orderFactory',  ['$resource', function($resource) {

    // MOCK START

    var clients = [{
        id: 1,
        name: 'Client-1'
    }, {
        id: 2,
        name: 'Client-2'
    }];

    var list = [{
        id: 1,
        name: 'Order-1',
        weight: 1200,
        destination: 'Berlin',
        createdAt: (new moment()).format(),
        client: angular.copy(clients[0])
    }, {
        id: 2,
        name: 'Order-2',
        weight: 1000,
        destination: 'Munich',
        createdAt: (new moment()).subtract(1, 'days').format(),
        client: angular.copy(clients[1])
    }, {
        id: 3,
        name: 'Order-3',
        weight: 200,
        destination: 'Bremen',
        createdAt: (new moment()).add(1, 'days').format(),
        client: angular.copy(clients[1])
    }];

    return {
        list: function(params, onSuccess, onError) {

            var order = params.order || 'id';
            var asc = true;

            if (order.slice(0, 1) === '-') {

                order = order.slice(1);

                asc = false;
            }

            var listSorted = _.sortBy(list, order);

            if (!asc) {
                listSorted.reverse();
            }

            return onSuccess({
                success: true,
                data: listSorted
            });
        },
        show: function(params, onSuccess, onError) {

            var id = params.id;

            var found = list.filter(function(item) {

                return item.id === id;
            });

            if (!found.length) {

                return onError({
                    success: false,
                    message: 'Order Not Found'
                });
            }

            return onSuccess({
                success: true,
                data: found[0]
            });
        },
        create: function(params, onSuccess, onError) {

            var clientFound = clients.filter(function(item) {

                return item.id === Number(params.client.id);
            });

            if (!clientFound.length) {

                return onError({
                    success: false,
                    message: 'Client Not Found'
                });
            }

            params.client = clientFound[0];

            var id = 1;

            clients.forEach(function(item) {

                if (item.id > id) {
                    id = item.id;
                }
            });

            list.push(_.extend({
                id: id + 1,
                createdAt: (new moment()).format()
            }, params));

            return onSuccess({
                success: true
            });
        },
        update: function(params, onSuccess, onError) {

            var id = params.id;

            var found = list.filter(function(item) {

                return item.id === id;
            });

            if (!found.length) {

                return onError({
                    success: false,
                    message: 'Order Not Found'
                });
            }

            var clientFound = clients.filter(function(item) {

                return item.id === Number(params.client.id);
            });

            if (!clientFound.length) {

                return onError({
                    success: false,
                    message: 'Client Not Found'
                });
            }

            params.client = clientFound[0];

            _.extend(found[0], params);

            return onSuccess({
                success: true
            });
        },
        remove: function(params, onSuccess, onError) {

            var id = params.id;
            var index = _.findIndex(list, function(item) {

                return item.id === id;
            });

            if (index === -1) {

                return onError({
                    success: false,
                    message: 'Order Not Found'
                });
            }

            list.splice(index, 1);

            return onSuccess({
                success: true
            });
        }
    };
    // MOCK END

    return $resource('/order', {}, {
        list: {
            method: 'GET'
        },
        show: {
            url: '/order/:orderId',
            method: 'GET'
        },
        update: {
            url: '/order/:orderId',
            method: 'PUT'
        },
        add: {
            method: 'POST'
        },
        remove: {
            url: '/order/:orderId',
            method: 'DELETE'
        }
    });
}]);