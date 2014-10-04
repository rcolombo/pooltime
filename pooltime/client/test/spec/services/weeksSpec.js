(function () {
    'use strict';

    var March_1_1989_3_PM_EST, March_15_1989_3_PM_EST, March_22_1989_3_PM_EST, March_29_1989_3_PM_EST, July_5_1989_3_PM_EST, July_12_1989_3_PM_EST;

    March_1_1989_3_PM_EST = new Date('1989-03-01T15:00:00-04:00');
    March_15_1989_3_PM_EST = new Date('1989-03-15T15:00:00-04:00'); // WEEK_1_START_DATE
    March_22_1989_3_PM_EST = new Date('1989-03-22T15:00:00-04:00');
    March_29_1989_3_PM_EST = new Date('1989-03-29T15:00:00-04:00');
    July_5_1989_3_PM_EST = new Date('1989-07-05T15:00:00-04:00');
    July_12_1989_3_PM_EST = new Date('1989-07-12T15:00:00-04:00');

    describe('services.weeks', function () {
        describe('NFLWeeks', function () {
            var NFLWeeks, now;
            beforeEach(function () {
                function providerOverride($provide) {
                    $provide.constant('WEEK_1_START_DATE', March_15_1989_3_PM_EST);
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
                    expect(NFLWeeks.getStartOfWeek(1)).toEqual(March_15_1989_3_PM_EST);
                });

                it('should be exactly 7 days after the WEEK_1_START_DATE when it is week 2', function () {
                    expect(NFLWeeks.getStartOfWeek(2)).toEqual(March_22_1989_3_PM_EST);
                });

                it('should be exactly 17 weeks after the WEEK_1_START_DATE when it is week 17', function () {
                    expect(NFLWeeks.getStartOfWeek(17)).toEqual(July_5_1989_3_PM_EST);
                });
            });

            describe('getEndOfWeek', function () {
                it('should be exactly 7 days after the WEEK_1_START_DATE when it is week 1', function () {
                    expect(NFLWeeks.getEndOfWeek(1)).toEqual(March_22_1989_3_PM_EST);
                });

                it('should be exactly 14 days after the WEEK_1_START_DATE when it is week 2', function () {
                    expect(NFLWeeks.getEndOfWeek(2)).toEqual(March_29_1989_3_PM_EST);
                });

                it('should be exactly 18 weeks after the WEEK_1_START_DATE when it is week 17', function () {
                    expect(NFLWeeks.getEndOfWeek(17)).toEqual(July_12_1989_3_PM_EST);
                });
            });

            describe('getCurrentWeek', function () {
                it('should be week 1 when the current date is before the WEEK_1_START_DATE', function () {
                    now = March_1_1989_3_PM_EST;
                    expect(NFLWeeks.getCurrentWeek()).toBe(1);
                });

                it('should be week 1 when the current date is the WEEK_1_START_DATE', function () {
                    now = March_15_1989_3_PM_EST;
                    expect(NFLWeeks.getCurrentWeek()).toBe(1);
                });

                it('should be week 1 when the current date is less than 7 days after the WEEK_1_START_DATE', function () {
                    now = new Date(March_22_1989_3_PM_EST.valueOf() - 1);
                    expect(NFLWeeks.getCurrentWeek()).toBe(1);
                });

                it('should be week 2 when the current date is exactly 7 days after the WEEK_1_START_DATE', function () {
                    now = March_22_1989_3_PM_EST;
                    expect(NFLWeeks.getCurrentWeek()).toBe(2);
                });

                it('should be week 17 when the current date is after the season ends', function () {
                    now = new Date();
                    expect(NFLWeeks.getCurrentWeek()).toBe(17);
                });
            });
        });
    });
}());