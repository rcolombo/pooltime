(function (angular) {
    'use strict';

    angular.module('directives.header', ['services.user', 'services.weeks', 'ngRoute'])

        .directive('jzPicksHeader', ['$location', 'UserService', 'UserWeek', '$routeParams', '$interpolate', function ($location, UserService, UserWeek, $routeParams, $interpolate) {
            return {
                replace: true,
                templateUrl: 'scripts/directives/header/header.html',
                controllerAs: 'headerCtrl',
                controller: function () {

                    this.tabs = [{
                        path: '/picks/{{week}}',
                        title: 'My Picks'
                    }, {
                        path: '/all-picks/{{week}}',
                        title: 'All Picks'
                    }, {
                        path: '/standings',
                        title: 'Standings'
                    }];
                    this.resolvePath = function (path) {
                        return $interpolate(path)({
                            week: UserWeek.selectedWeek
                        });
                    };
                    this.atLocation = function (path) {
                        return $location.path() === this.resolvePath(path);
                    };
                    this.showNavHeader = function () {
                        return UserService.isLoggedIn() && $location.path() !== '/login';
                    };

                    this.showDropdown = false;
                }
            };
        }]);
})(angular);