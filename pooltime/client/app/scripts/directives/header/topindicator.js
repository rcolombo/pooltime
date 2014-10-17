(function (angular) {
    'use strict';

    angular.module('directives.topindicator', ['services.topindicator'])

        .directive('jzTopIndicator', ['$timeout', function ($timeout) {
            return {
                link: function ($scope) {
                    var fadePromise;
                    $scope.$on('topIndicatorMessage', function (event, message, type) {
                        if (fadePromise) {
                            $timeout.cancel(fadePromise);
                        }
                        $scope.message = message;
                        $scope.type = type;
                        $scope.showMessage = true;
                        fadePromise = $timeout(function () {
                            $scope.showMessage = false;
                        });
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