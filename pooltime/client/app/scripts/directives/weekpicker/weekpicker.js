(function (angular) {
    'use strict';

    angular.module('directives.weekpicker', ['services.weeks'])

        .directive('jzWeekPicker', ['NFLWeeks', 'UserWeek', function (NFLWeeks, UserWeek) {
            return {
                replace: true,
                templateUrl: 'scripts/directives/weekpicker/weekpicker.html',
                controllerAs: 'weekPicker',
                link: function ($scope) {
                    var weekPicker = {};
                    function setRange(selected) {
                        weekPicker.greatest = selected + 2;
                        weekPicker.least = selected - 3;
                        if (weekPicker.greatest > 17) {
                            weekPicker.least -= weekPicker.greatest - 17;
                            weekPicker.greatest = 17;
                        } else if (weekPicker.least < 1) {
                            weekPicker.greatest += 1 - weekPicker.least;
                            weekPicker.least = 1;
                        }
                    }

                    weekPicker.weeks = NFLWeeks.getWeeks();
                    weekPicker.userWeek = UserWeek;
                    setRange(UserWeek.selectedWeek);
                    weekPicker.showLeft = function () {
                        return weekPicker.least > 1;
                    };
                    weekPicker.showRight = function () {
                        return weekPicker.greatest < 17;
                    };
                    weekPicker.leftClicked = function () {
                        UserWeek.selectedWeek = weekPicker.least - 1;
                        setRange(UserWeek.selectedWeek);
                    };
                    weekPicker.rightClicked = function () {
                        UserWeek.selectedWeek = weekPicker.greatest + 1;
                        setRange(UserWeek.selectedWeek);
                    };
                    weekPicker.isActive = function (week) {
                        return week.value === weekPicker.userWeek.selectedWeek;
                    };
                    weekPicker.isCurrent = function (week) {
                        return NFLWeeks.getCurrentWeek().value === week.value;
                    };

                    weekPicker.weeksPaginationFilter = function (week) {
                        return week.value >= weekPicker.least && week.value <= weekPicker.greatest;
                    };

                    $scope.weekPicker = weekPicker;
                }
            };
        }]);
})(angular);