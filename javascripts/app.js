var aTest = angular.module('aTest', [
    'ngRoute',
    'ngResource',
    'ngMaterial',
    'md.data.table',
    'aPartial'
]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    aTest.env = '%env%';

    $routeProvider
        .when('/', {
            templateUrl: '../partials/order/index.html',
            controller: 'orderController',
            controllerAs: 'vm'
        })
        .when('/user/login', {
            templateUrl: '../partials/user/login.html',
            controller: 'userLoginController',
            controllerAs: 'vm'
        })
        .when('/order/add', {
            templateUrl: '../partials/order/add.html',
            controller: 'orderAddController',
            controllerAs: 'vm'
        })
        .when('/order/:id', {
            templateUrl: '../partials/order/edit.html',
            controller: 'orderEditController',
            controllerAs: 'vm'
        })
        .when('/user', {
            templateUrl: '../partials/user/index.html',
            controller: 'userController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);