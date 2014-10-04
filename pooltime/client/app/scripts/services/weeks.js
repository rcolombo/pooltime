(function (angular) {
    'use strict';

    angular.module('services.weeks.constants', [])
        .constant('WEEK_1_START_DATE', new Date('2014-09-03T03:00:00-04:00'))
        .constant('REG_SEASON_LEN', 17);

    angular.module('services.weeks', ['ngMoment', 'services.weeks.constants', 'services.common.now'])

        .service('UserWeek', ['NFLWeeks', function (NFLWeeks) {
            this.selectedWeek = NFLWeeks.getCurrentWeek();
        }])

        .service('NFLWeeks', ['$moment', 'WEEK_1_START_DATE', 'REG_SEASON_LEN', 'now', function ($moment, WEEK_1_START_DATE, REG_SEASON_LEN, now) {

            var weeks = [];

            function init() {
                var weekIndex, moment;
                moment = $moment(WEEK_1_START_DATE);
                for (weekIndex = 0; weekIndex < REG_SEASON_LEN; weekIndex++) {
                    weeks[weekIndex] = {
                        start: moment.clone().toDate(),
                        end: moment.add(1, 'week').clone().toDate()
                    };
                }
            }

            function getStartOfWeek(weekNumber) {
                var weekIndex = parseInt(weekNumber, 10) - 1;
                return weeks[weekIndex].start;
            }
            function getEndOfWeek(weekNumber) {
                var weekIndex = parseInt(weekNumber, 10) - 1;
                return weeks[weekIndex].end;
            }
            function getCurrentWeek() {
                var weekNumber; // EST time zone
                function isCurrentWeekOrLastWeekOfSeason() {
                    return now() < getEndOfWeek(weekNumber) || weekNumber >= REG_SEASON_LEN;
                }
                for (weekNumber = 1; !isCurrentWeekOrLastWeekOfSeason(); weekNumber++) {}
                return weekNumber;
            }

            init();
            this.getStartOfWeek = getStartOfWeek;
            this.getEndOfWeek = getEndOfWeek;
            this.getCurrentWeek = getCurrentWeek;

        }]);
})(angular);