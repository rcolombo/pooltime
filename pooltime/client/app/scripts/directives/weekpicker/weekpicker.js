(function (angular) {
    'use strict';

    angular.module('directives.weekpicker', ['services.weeks'])

        .directive('jzWeekPicker', ['NFLWeeks', 'UserWeek', function (NFLWeeks, UserWeek) {
            return {
                replace: true,
                templateUrl: 'scripts/directives/weekpicker/weekpicker.html',
                controllerAs: 'weekPickerCtrl',
                controller: function () {
                    this.weeks = NFLWeeks.getWeeks();
                    this.userWeek = UserWeek;
                }
            };
        }]);
})(angular);