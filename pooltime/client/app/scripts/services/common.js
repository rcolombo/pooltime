(function (angular) {
    'use strict';

    angular.module('services.common', ['services.common.now']);

    angular.module('services.common.now', [])
        .factory('now', function () {
            return function () {
                return new Date();
            };
        });
})(angular);