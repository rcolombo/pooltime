(function (angular) {
    'use strict';

    angular.module('directives.topindicator', ['services.topindicator'])

        .directive('jzTopIndicator', ['TopIndicator', '$timeout', function (TopIndicator, $timeout) {
            return {
                link: function ($scope, element) {
                    $scope.$on('topIndicatorMessage', function (event, message, type) {
                        element.removeClass('success');
                        element.removeClass('error');
                        element.text(message);
                        if (type === 'success') {
                            element.addClass('success');
                        } else if (type === 'error') {
                            element.addClass('error');
                        }
                        element.addClass('active');
                        $timeout(function () {
                            element.removeClass('active');
                        }, 1000);
                    });
                }
            };
        }]);

    angular.module('services.topindicator', [])

        .service('TopIndicator', ['$rootScope', function ($rootScope) {
            this.setMessage = function (message, type) {
                $rootScope.$broadcast('topIndicatorMessage', message, type);
            };
        }]);
})(angular);