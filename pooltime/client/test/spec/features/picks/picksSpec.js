(function () {
    'use strict';

    var testData = {};

    testData.picks = {};
    testData.picks[1] = {
        'joe': {
            'abcd': 'Oilers',
            'wxyz': 'Browns'
        },
        'colombo': {
            'abcd': 'Patriots',
            'wxyz': 'Jets'
        }
    };

    describe('picks', function () {
        describe('PicksService', function () {
            var PicksService, ColomboAPI, UserWeek, $q, $rootScope;
            beforeEach(function () {
                ColomboAPI = {
                    getPicks: function (week) {
                        return $q.when(testData.picks[week]);
                    },
                    updatePicks: function (picks) {
                        this.updated = picks;
                        return $q.when();
                    },
                    flush: function () {
                        $rootScope.$digest();
                    }
                };
                UserWeek = {
                    selectedWeek: 1
                };
                function providerOverride($provide) {
                    $provide.value('ColomboAPI', ColomboAPI);
                    $provide.value('UserWeek', UserWeek);
                }
                module('picks', providerOverride);
                inject(function (_PicksService_, _$q_, _$rootScope_) {
                    PicksService = _PicksService_;
                    $q = _$q_;
                    $rootScope = _$rootScope_;
                });

            });

            describe('getPicksForAllUsers', function () {
                it('should call on the ColomboAPI to get the picks for the selected week', function () {
                    var result;
                    PicksService.getPicksForAllUsers().then(function (data) {
                        result = data;
                    });
                    ColomboAPI.flush();
                    expect(result).toEqual(testData.picks[1]);
                });
            });

            describe('getPicksForUser', function () {
                it('should call on the ColomboAPI to get the picks for the selected week', function () {
                    var result, user;
                    user = {
                        username: 'joe'
                    };
                    PicksService.getPicksForUser(user).then(function (data) {
                        result = data;
                    });
                    ColomboAPI.flush();
                    expect(result).toEqual(testData.picks[1].joe);
                });
            });

            describe('updatePicks', function () {
                it('should call on the ColomboAPI to get the picks for the selected week', function () {
                    var returnsPromise, picks;
                    picks = { whatever: 'fake object yeah' };
                    PicksService.updatePicks(picks).then(function () {
                        returnsPromise = true;
                    });
                    ColomboAPI.flush();
                    expect(returnsPromise).toBe(true);
                    expect(ColomboAPI.updated).toBe(picks);
                });
            });
        });
    });
})();