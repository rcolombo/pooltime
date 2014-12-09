(function (angular) {
    'use strict';

    angular.module('services.weeks.constants', [])
        .constant('WEEK_1_START_DATE', new Date('2014-09-03T03:00:00-04:00'))
        .constant('TimeZoneOffset', '-04:00') // EST
        .constant('REG_SEASON_LEN', 17);

    angular.module('services.weeks', ['ngMoment', 'services.weeks.constants', 'services.common.now'])

        .service('UserWeek', ['NFLWeeks', function (NFLWeeks) {
            this.selectedWeek = NFLWeeks.getCurrentWeek().value;
        }])

        .service('NFLWeeks', ['$moment', 'WEEK_1_START_DATE', 'REG_SEASON_LEN', 'now', 'TimeZoneOffset', function ($moment, WEEK_1_START_DATE, REG_SEASON_LEN, now, TimeZoneOffset) {

            var weeks = [];

            function init() {
                var weekIndex, moment;
                moment = $moment(WEEK_1_START_DATE).zone(TimeZoneOffset);
                for (weekIndex = 0; weekIndex < REG_SEASON_LEN; weekIndex++) {
                    weeks[weekIndex] = {
                        name: 'Week ' + (weekIndex + 1),
                        value: weekIndex + 1,
                        start: moment.clone().toDate(),
                        deadline: moment.clone().day(7).hour(13).minute(0).second(0).millisecond(0).toDate(),
                        end: moment.add(1, 'week').clone().toDate()
                    };
                }
            }

            function getWeeks() {
                return weeks;
            }
            function getWeek(value) {
                return weeks[value - 1];
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
                return weeks[weekNumber - 1];
            }
            function getDeadlineOfWeek(weekNumber) {
                return weeks[weekNumber - 1].deadline;
            }
            function isNowAfterDeadlineOfWeek(weekNumber) {
                return now() > getDeadlineOfWeek(weekNumber);
            }

            init();
            this.getWeeks = getWeeks;
            this.getWeek = getWeek;
            this.getStartOfWeek = getStartOfWeek;
            this.getEndOfWeek = getEndOfWeek;
            this.getCurrentWeek = getCurrentWeek;
            this.getDeadlineOfWeek = getDeadlineOfWeek;
            this.isNowAfterDeadlineOfWeek = isNowAfterDeadlineOfWeek;
        }]);
})(angular);