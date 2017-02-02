'use strict';

/* global aTest */

aTest.

controller('mainController', ['$mdSidenav', 'userService', '$location', function($mdSidenav, userService, $location) {

    var app = this;

    app.menu = [
        {
            name: 'Account',
            url: '/user'
        },
        {
            name: 'Orders',
            url: '/'
        }
    ];

    app.url = $location.path();

    app.userService = userService;

    app.openSidenav = openSidenav;
    app.menuOpen = menuOpen;

    function menuOpen(menu) {

        $location.path(menu.url);

        app.url = $location.path();
    }

    function openSidenav(id) {

        return $mdSidenav(id).toggle(true);
    }

    function init() {

        userService.getUser({
            id: 1
        });
    }

    return init();
}]);
