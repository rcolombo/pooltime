(function () {
    'use strict';

    var Dates = {};

    Dates.March_1_1989_3_PM_EST = new Date('1989-03-01T15:00:00-05:00');
    Dates.March_15_1989_3_PM_EST = new Date('1989-03-15T15:00:00-05:00'); // WEEK_1_START_DATE
    Dates.March_22_1989_3_PM_EST = new Date('1989-03-22T15:00:00-05:00');
    Dates.March_29_1989_3_PM_EST = new Date('1989-03-29T15:00:00-05:00');
    Dates.July_5_1989_3_PM_EST = new Date('1989-07-05T15:00:00-05:00');
    Dates.July_12_1989_3_PM_EST = new Date('1989-07-12T15:00:00-05:00');

    describe('services.weeks', function () {
        describe('NFLWeeks', function () {
            var NFLWeeks, now;
            beforeEach(function () {
                function providerOverride($provide) {
                    $provide.constant('WEEK_1_START_DATE', Dates.March_15_1989_3_PM_EST);
                    $provide.constant('REG_SEASON_LEN', 17);
                    $provide.value('now', function () {
                        return now;
                    });
                }
                module('services.weeks', providerOverride);
                inject(function (_NFLWeeks_) {
                    NFLWeeks = _NFLWeeks_;
                });
            });

            describe('getStartOfWeek', function () {
                it('should be equal to the constant WEEK_1_START_DATE when it is week 1', function () {
                    expect(NFLWeeks.getStartOfWeek(1)).toEqual(Dates.March_15_1989_3_PM_EST);
                });

                it('should be exactly 7 days after the WEEK_1_START_DATE when it is week 2', function () {
                    expect(NFLWeeks.getStartOfWeek(2)).toEqual(Dates.March_22_1989_3_PM_EST);
                });

                it('should be exactly 17 weeks after the WEEK_1_START_DATE when it is week 17', function () {
                    expect(NFLWeeks.getStartOfWeek(17)).toEqual(Dates.July_5_1989_3_PM_EST);
                });
            });

            describe('getEndOfWeek', function () {
                it('should be exactly 7 days after the WEEK_1_START_DATE when it is week 1', function () {
                    expect(NFLWeeks.getEndOfWeek(1)).toEqual(Dates.March_22_1989_3_PM_EST);
                });

                it('should be exactly 14 days after the WEEK_1_START_DATE when it is week 2', function () {
                    expect(NFLWeeks.getEndOfWeek(2)).toEqual(Dates.March_29_1989_3_PM_EST);
                });

                it('should be exactly 18 weeks after the WEEK_1_START_DATE when it is week 17', function () {
                    expect(NFLWeeks.getEndOfWeek(17)).toEqual(Dates.July_12_1989_3_PM_EST);
                });
            });

            describe('getCurrentWeek', function () {
                it('should be week 1 when the current date is before the WEEK_1_START_DATE', function () {
                    now = Dates.March_1_1989_3_PM_EST;
                    expect(NFLWeeks.getCurrentWeek().value).toBe(1);
                });

                it('should be week 1 when the current date is the WEEK_1_START_DATE', function () {
                    now = Dates.March_15_1989_3_PM_EST;
                    expect(NFLWeeks.getCurrentWeek().value).toBe(1);
                });

                it('should be week 1 when the current date is less than 7 days after the WEEK_1_START_DATE', function () {
                    now = new Date(Dates.March_22_1989_3_PM_EST.valueOf() - 1);
                    expect(NFLWeeks.getCurrentWeek().value).toBe(1);
                });

                it('should be week 2 when the current date is exactly 7 days after the WEEK_1_START_DATE', function () {
                    now = Dates.March_22_1989_3_PM_EST;
                    expect(NFLWeeks.getCurrentWeek().value).toBe(2);
                });

                it('should be week 17 when the current date is after the season ends', function () {
                    now = new Date();
                    expect(NFLWeeks.getCurrentWeek().value).toBe(17);
                });
            });

            describe('getDeadlineOfWeek', function () {
                it('should always be the following Sunday at 1:00 PM Eastern time', function () {
                    var sundayAt1;
                    sundayAt1 = new Date('1989-03-19T13:00:00-05:00');

                    expect(NFLWeeks.getDeadlineOfWeek(1)).toEqual(sundayAt1);
                    sundayAt1 = new Date('1989-03-26T13:00:00-05:00');
                    expect(NFLWeeks.getDeadlineOfWeek(2)).toEqual(sundayAt1);
                    sundayAt1 = new Date('1989-07-09T13:00:00-05:00');
                    expect(NFLWeeks.getDeadlineOfWeek(17)).toEqual(sundayAt1);

                });
            });

            describe('isNowAfterDeadlineOfWeek', function () {
                it('should be true if now is after the deadline', function () {
                    var thursday, sundayBefore1, sundayAfter1, sundayAt1, nextSundayAt1;
                    thursday = new Date('1989-03-16T20:00:00-05:00');
                    sundayBefore1 = new Date('1989-03-19T12:59:00-05:00');
                    sundayAt1 = new Date('1989-03-19T13:00:00-05:00');
                    sundayAfter1 = new Date('1989-03-19T13:01:00-05:00');
                    nextSundayAt1 = new Date('1989-03-26T13:00:00-05:00');

                    now = thursday;
                    expect(NFLWeeks.isNowAfterDeadlineOfWeek(1)).toBeFalsy();

                    now = sundayBefore1;
                    expect(NFLWeeks.isNowAfterDeadlineOfWeek(1)).toBeFalsy();

                    now = sundayAt1;
                    expect(NFLWeeks.isNowAfterDeadlineOfWeek(1)).toBeFalsy();

                    now = sundayAfter1;
                    expect(NFLWeeks.isNowAfterDeadlineOfWeek(1)).toBeTruthy();
                });
            });
        });
    });
}());