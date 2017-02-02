'use strict';

/* global aTest */

aTest.

factory('userService', ['userFactory', '$location', function(userFactory, $location) {

    var _guest = {
        id: 0,
        email: 'noreply@service.com',
        name: 'Guest'
    };

    var Service = {
        user: angular.copy(_guest)
    };

    Service.isLoggedIn = isLoggedIn;
    Service.getUser = getUser;
    Service.update = update;
    Service.logout = logout;
    Service.login = login;
    Service.signin = signin;

    function isLoggedIn() {

        return !!Service.user.id;
    }

    function logout() {

        Service.user = angular.copy(_guest);

        login();
    }

    function login() {

        $location.path('/user/login');
    }

    function signin(params, callback) {

        return getUser({
            id: 1
        }, callback);
    }

    function getUser(params, callback) {

        callback = callback || angular.noop;

        return userFactory.show(params, function(result) {

            if (!result.success) {
                return callback(result);
            }

            Service.user = result.data;

            return callback(null, result.data);
        }, callback);
    }

    function update(params, callback) {

        return userFactory.update(params, function(result) {

            if (!result.success) {
                return callback(result);
            }

            getUser({
                id: params.id
            });

            return callback();
        }, callback);
    }

    return Service;
}]);