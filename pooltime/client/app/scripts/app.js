(function (angular) {
    'use strict';

    angular.module('nflpicks', ['ngRoute', 'ngStorage', 'ngAnimate', 'directives', 'login', 'picks', 'ngMoment', 'angularSpinner'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/login'
            });
        }])

        .run(['$rootScope', '$location', 'UserService', '$localStorage', function ($rootScope, $location, UserService, $localStorage) {
            if ($localStorage.username) {
                UserService.getCurrentUser().username = $localStorage.username;
                UserService.login().finally(function () {
                    if (!UserService.isLoggedIn()) {
                        $location.path('/login');
                    }
                });
            }

            function onRouteChangeStart() {
                $rootScope.isRouteChanging = true;
                $rootScope.$broadcast('us-spinner:spin', 'main-spinner');
            }
            function onRouteChangeFinished() {
                $rootScope.isRouteChanging = false;
                $rootScope.$broadcast('us-spinner:stop', 'main-spinner');
            }
            $rootScope.$on('$routeChangeStart', onRouteChangeStart);
            $rootScope.$on('$routeChangeSuccess', onRouteChangeFinished);
            $rootScope.$on('$routeChangeError', onRouteChangeFinished);
        }]);
})(angular);