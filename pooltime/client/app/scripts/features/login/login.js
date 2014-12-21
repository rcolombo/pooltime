(function (angular) {
    'use strict';

    angular.module('login', ['ngRoute', 'services.user', 'services.topindicator'])

        .config(function ($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'scripts/features/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginView'
            });
        })

        .controller('LoginCtrl', function (UserService, UserWeek, $location, TopIndicator) {
            this.user = UserService.getCurrentUser();

            function redirectToPicks() {
                $location.path('/picks/' + UserWeek.selectedWeek);
            }

            function addLoginError(errorResponse) {
                if (errorResponse.status === 401) {
                    TopIndicator.setMessage('Username does not exist!', 'error');
                }
            }

            this.login = function () {
                UserService.login()
                    .then(redirectToPicks, addLoginError);
            };

        });
})(angular);