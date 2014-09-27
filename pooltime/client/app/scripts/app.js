(function (angular) {
	'use strict';

	angular.module('nflpicks', ['ngRoute', 'ngStorage', 'login', 'picks'])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.otherwise({
				redirectTo: '/login'
			});
		}])

		.run(['$rootScope', '$location', 'UserService', '$localStorage', function ($rootScope, $location, UserService, $localStorage) {
			if (!UserService.isLoggedIn() && $localStorage.username) {
				UserService.getCurrentUser().username = $localStorage.username;
				UserService.login();
			}
			$rootScope.$on('$routeChangeStart', function () {
				var path = $location.path();
				if (path === '/login' && UserService.isLoggedIn()) {
					$location.path('/picks');
				} else if (path !== '/login' && !UserService.isLoggedIn()) {
					$location.path('/login');
				}
			});
		}])

		.directive('jzNavHeader', ['$location', 'UserService', function ($location, UserService) {
			return {
				replace: true,
				template:
					'<div class="header" ng-show="userIsLoggedIn()">' +
					'    <ul class="nav nav-pills pull-right">' +
	                '        <li ng-repeat="tab in tabs" ng-class="{\'active\': atLocation(tab.path)}"><a ng-href="#{{tab.path}}">{{ tab.title }}</a></li>' +
	                '    </ul>' +
	                '    <h3 class="text-muted">Week 1</h3>' +
	                '</div>',
				link: function ($scope) {
					$scope.tabs = [{
						path: '/picks',
						title: 'My Picks'
					}, {
						path: '/all-picks',
						title: 'All Picks'
					}];
					$scope.atLocation = function (path) {
						return $location.path() === path;
					};
					$scope.userIsLoggedIn = function () {
						return UserService.isLoggedIn();
					};
					$scope.getCurrentTab = function () {
						var curTab, path = $location.path();
						angular.forEach(this.tabs, function (tab) {
							if (tab.path === path) {
								curTab = tab;
							}
						});
						return curTab;
					};
				}
			};
		}]);
})(angular);