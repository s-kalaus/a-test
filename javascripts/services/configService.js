'use strict';

/* global aTest */

aTest.

factory('configService', function() {

    var data = {
        get: function(key) {
            return data[key];
        }
    };

    _.assign(data, window.config, window.config[aTest.env]);

    delete data.envs;

    return data;
});