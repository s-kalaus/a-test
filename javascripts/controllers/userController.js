'use strict';

/* global aTest */

aTest.

controller('userController', ['userService', '$location', function(userService, $location) {

    if (!userService.isLoggedIn()) {
        return $location.path('/user/login');
    }

    var vm = this;

    vm.card = null;

    vm.submit = submit;

    function submit() {

        return userService.update(vm.card, function(err) {

            if (err) {
                return;
            }

            $location.path('/');
        });
    }


    function init() {

        vm.card = angular.copy(userService.user);
    }

    return init();
}]).

controller('userLoginController', ['userService', '$location', function(userService, $location) {

    var vm = this;

    vm.submit = submit;

    vm.card = {
        email: '',
        password: ''
    };

    function submit() {

        return userService.signin(vm.card, function(err) {

            if (err) {
                return;
            }

            $location.path('/');
        });
    }

    function init() {

    }

    return init();
}]);
