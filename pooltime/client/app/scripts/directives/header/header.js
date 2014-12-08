(function (angular) {
    'use strict';

    angular.module('directives.header', ['services.user', 'services.weeks', 'ngRoute'])

        .directive('jzPicksHeader', ['$location', 'UserService', 'UserWeek', 'REG_SEASON_LEN', '$routeParams', '$interpolate', function ($location, UserService, UserWeek, REG_SEASON_LEN, $routeParams, $interpolate) {
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

                    function getWeeks() {
                        var weeks = [], weekIndex;
                        for (weekIndex = 1; weekIndex <= REG_SEASON_LEN; weekIndex++) {
                            weeks.push({
                                label: 'Week ' + weekIndex,
                                value: weekIndex
                            });
                        }
                        return weeks;
                    }
                    this.weeks = getWeeks();
                    this.userWeek = UserWeek;
                    this.showLeftArrow = function () {
                        return UserWeek.selectedWeek > 1;
                    };
                    this.showRightArrow = function () {
                        return UserWeek.selectedWeek < REG_SEASON_LEN;
                    };
                    this.leftArrowClicked = function () {
                        UserWeek.selectedWeek--;
                    };
                    this.rightArrowClicked = function () {
                        UserWeek.selectedWeek++;
                    };
                }
            };
        }]);
})(angular);