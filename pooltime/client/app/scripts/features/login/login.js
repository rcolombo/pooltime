(function (angular) {
	'use strict';

	angular.module('login', ['ngRoute'])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/login', {
				templateUrl: 'scripts/features/login/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'loginView'
			});
		}])

		.service('UserService', ['$q', '$localStorage', function ($q, $localStorage) {
			var state, currentUser;

			state = {
				loggedIn: false
			};

			currentUser = {
				username: ''
			};

			this.isLoggedIn = function () {
				return state.loggedIn;
			};

			this.getState = function () {
				return state;
			};

			this.getCurrentUser = function () {
				return currentUser;
			};

			function afterSuccessfulLogin() {
				state.loggedIn = true;
			}

			this.login = function () {
				$localStorage.username = currentUser.username;
				return $q.when(true)
					.then(afterSuccessfulLogin);
			};
		}])

		.controller('LoginCtrl', ['UserService', '$location', function (UserService, $location) {
			this.user = UserService.getCurrentUser();

			function redirectToPicks() {
				$location.path('/picks');
			}

			this.login = function () {
				UserService.login()
					.then(redirectToPicks);
			};

		}]);
})(angular);