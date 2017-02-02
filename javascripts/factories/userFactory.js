'use strict';

/* global aTest, _ */
'use strict';

/* global aTest */

aTest.

factory('userFactory',  ['$resource', function($resource) {

    // MOCK START

    var list = [{
        id: 1,
        email: 'fake@email.com',
        name: 'User-1'
    }];

    return {
        show: function(params, onSuccess, onError) {

            var id = params.id;

            var found = list.filter(function(item) {

                return item.id === id;
            });

            if (!found.length) {

                return onError({
                    success: false,
                    message: 'User Not Found'
                });
            }

            return onSuccess({
                success: true,
                data: found[0]
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
                    message: 'User Not Found'
                });
            }

            _.extend(found[0], params);

            return onSuccess({
                success: true
            });
        }
    };
    // MOCK END

    return $resource('/user', {}, {
        show: {
            url: '/user/:userId',
            method: 'GET'
        },
        update: {
            method: 'PUR'
        }
    });
}]);