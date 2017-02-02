'use strict';

/* global aTest */

aTest.

controller('orderController', ['userService', 'orderService', '$location', function(userService, orderService, $location) {

    if (!userService.isLoggedIn()) {
        return $location.path('/user/login');
    }

    var vm = this;

    vm.list = [];

    vm.getList = getList;
    vm.orderRemove = orderRemove;
    vm.orderEdit = orderEdit;
    vm.orderAdd = orderAdd;

    function getList(order) {

        return orderService.getList({
            order: order
        }, function(err, list) {

            if (err) {
                return;
            }

            vm.list = list;
        });
    }

    function orderRemove(order) {

        return orderService.remove({
            id: order.id
        }, function(err) {

            if (err) {
                return;
            }

            getList();
        });
    }

    function orderEdit(order) {

        $location.path('/order/' + order.id);
    }

    function orderAdd() {

        $location.path('/order/add');
    }

    function init() {

        getList();
    }

    return init();
}]).

controller('orderAddController', ['userService', 'orderService', 'clientService', '$location', function(userService, orderService, clientService, $location) {

    if (!userService.isLoggedIn()) {
        return $location.path('/user/login');
    }

    var vm = this;

    vm.clients = [];
    vm.card = {
        name: '',
        weight: 0,
        destination: '',
        client: {
            id: 1
        }
    };

    vm.submit = submit;
    vm.cancel = cancel;

    function getClients() {

        return clientService.getList({}, function(err, clients) {

            if (err) {
                return;
            }

            vm.clients = clients;
        });
    }

    function submit() {

        return orderService.create(vm.card, function(err) {

            if (err) {
                return;
            }

            cancel();
        });
    }

    function cancel() {

        $location.path('/');
    }

    function init() {

        getClients();
    }

    return init();
}]).

controller('orderEditController', ['userService', 'orderService', 'clientService', '$routeParams', '$location', function(userService, orderService, clientService, $routeParams, $location) {

    if (!userService.isLoggedIn()) {
        return $location.path('/user/login');
    }

    var vm = this;

    vm.card = null;
    vm.clients = [];
    vm.id = Number($routeParams.id) || null;

    vm.getOrder = getOrder;
    vm.submit = submit;
    vm.cancel = cancel;

    function getOrder() {

        return orderService.getOrder({
            id: vm.id
        }, function(err, card) {

            if (err) {
                return;
            }

            vm.card = angular.copy(card);
        });
    }

    function getClients() {

        return clientService.getList({}, function(err, clients) {

            if (err) {
                return;
            }

            vm.clients = clients;
        });
    }

    function submit() {

        return orderService.update(vm.card, function(err) {

            if (err) {
                return;
            }

            cancel();
        });
    }

    function cancel() {

        $location.path('/');
    }

    function init() {

        getOrder();

        getClients();
    }

    return init();
}]);
