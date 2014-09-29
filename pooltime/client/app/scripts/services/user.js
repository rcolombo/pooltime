(function (angular) {
    'use strict';

    angular.module('services.user', ['services.colomboapi', 'ngStorage'])

        .service('UserService', ['$q', '$localStorage', 'ColomboAPI', function ($q, $localStorage, ColomboAPI) {
            var state, currentUser;

            state = {
                loggedIn: false
            };

            currentUser = {
                id: null,
                username: ''
            };

            this.isLoggedIn = function () {
                return true;
            };

            this.getState = function () {
                return state;
            };

            this.getCurrentUser = function () {
                return currentUser;
            };

            function afterSuccessfulLogin(userId) {
                state.loggedIn = true;
                currentUser.id = userId;
            }

            this.login = function () {
                $localStorage.username = currentUser.username;
                return ColomboAPI.login(currentUser.username)
                    .then(afterSuccessfulLogin);
            };
        }]);

})(angular);