(function (angular) {
	'use strict';

	angular.module('login', ['ngRoute', 'services.user'])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/login', {
				templateUrl: 'scripts/features/login/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'loginView'
			});
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