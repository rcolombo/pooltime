(function (angular) {
    'use strict';

    angular.module('services.weeks', ['ngMoment'])

        .service('UserWeek', ['NFLWeeks', function (NFLWeeks) {
            this.selectedWeek = NFLWeeks.getCurrentWeek();
        }])

        .service('NFLWeeks', ['$moment', function ($moment) {
            var REG_SEASON_LEN = 17, WEEK_1_START_DATE = '2014-09-03';

            this.Week = (function initWeeks(startDate) {
                var week = {}, weekNumber;
                startDate = $moment(startDate).startOf('day');
                for (weekNumber = 1; weekNumber <= REG_SEASON_LEN; weekNumber++) {
                    week[weekNumber] = {
                        start: $moment(startDate),
                        end: $moment(startDate).add(6, 'days').endOf('day')
                    };
                    startDate = $moment(startDate).add(7, 'days');
                }
                return week;
            }(WEEK_1_START_DATE));

            this.getCurrentWeek = function () {
                var now = $moment().zone('-0500'), result = null; // EST time zone
                angular.forEach(this.Week, function (week, weekNumber) {
                    if (now.isSame(week.start) || now.isAfter(week.start) && now.isBefore(week.end)) {
                        result = parseInt(weekNumber, 10);
                    }
                });
                return result;
            };
        }]);
})(angular);