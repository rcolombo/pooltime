(function () {
    'use strict';

    var testData;

    function setupTestData() {
        testData = {};
        testData.picks = {};
        testData.picks[1] = {
            'joe': {
                'abcd': 'Patriots',
                'wxyz': 'Browns',
                'asdf': 'Bills',
                'lkjh': 'Seahawks'
            },
            'colombo': {
                'abcd': 'Patriots',
                'wxyz': 'Jets',
                'asdf': 'Packers',
                'lkjh': 'Seahawks'
            },
            'will': {
                'abcd': 'Oilers',
                'wxyz': 'Jets',
                'asdf': 'Packers',
                'lkjh': 'Broncos'
            },
            'ryan': {
                'abcd': 'Oilers',
                'wxyz': 'Browns',
                'asdf': 'Bills',
                'lkjh': 'Broncos'
            }
        };

        testData.games = {};
        testData.games[1] = [{
            id: 'abcd',
            homeTeam: 'Oilers',
            awayTeam: 'Patriots',
            favorite: 'Patriots',
            underdog: 'Oilers',
            spread: 7.5,
            result: {
                homeScore: 16,
                awayScore: 24
            }
        }, {
            id: 'wxyz',
            homeTeam: 'Jets',
            awayTeam: 'Browns',
            favorite: 'Jets',
            underdog: 'Browns',
            spread: 2,
            result: {
                homeScore: 17,
                awayScore: 20
            }
        }, {
            id: 'asdf',
            homeTeam: 'Bills',
            awayTeam: 'Packers',
            favorite: 'Packers',
            underdog: 'Bills',
            spread: 6.5,
            result: {
                homeScore: 20,
                awayScore: 24
            }
        }, {
            id: 'lkjh',
            homeTeam: 'Broncos',
            awayTeam: 'Seahawks',
            favorite: 'Broncos',
            underdog: 'Seahawks',
            spread: 4.5,
            result: {
                homeScore: 31,
                awayScore: 45
            }
        }, {
            id: 'abcd',
            homeTeam: 'Giants',
            awayTeam: 'Eagles',
            favorite: 'Giants',
            underdog: 'Eagles',
            spread: 5,
            result: {
                homeScore: 40,
                awayScore: 35
            }
        }, {
            id: 'abcd',
            homeTeam: 'Giants',
            awayTeam: 'Eagles',
            favorite: 'Giants',
            underdog: 'Eagles',
            spread: 5,
            result: null
        }];
    }

    describe('picks', function () {
        beforeEach(setupTestData);

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

        describe('GamesService', function () {
            var GamesService, ColomboAPI, UserWeek, $q, $rootScope;

            beforeEach(function () {
                ColomboAPI = {
                    getGames: function (week) {
                        return $q.when(testData.games[week]);
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
                inject(function (_GamesService_, _$q_, _$rootScope_) {
                    GamesService = _GamesService_;
                    $q = _$q_;
                    $rootScope = _$rootScope_;
                });
            });

            describe('getGames', function () {
                it('should call on the ColomboAPI to get the games for the selected week', function () {
                    var result;
                    GamesService.getGames().then(function (data) {
                        result = data;
                    });
                    ColomboAPI.flush();
                    expect(result).toEqual(testData.games[1]);
                });
            });
        });

        describe('GameHelper', function () {
            var GameHelper;
            beforeEach(function () {
                module('picks');
                inject(function (_GameHelper_) {
                    GameHelper = _GameHelper_;
                });
            });

            describe('isCorrect', function () {
                it('should return true if the given team is the underdog and won', function () {
                    var game = testData.games[1][0];
                    game.result = {
                        homeScore: 35,
                        awayScore: 34
                    };
                    expect(GameHelper.isCorrect(game, 'Oilers')).toBeTruthy();
                });

                it('should return true if the given team is the underdog and the favorite won and did not cover', function () {
                    var game = testData.games[1][0];
                    game.result = {
                        homeScore: 17,
                        awayScore: 24
                    };
                    expect(GameHelper.isCorrect(game, 'Oilers')).toBeTruthy();
                });

                it('should return true if the given team is the favorite and covered', function () {
                    var game = testData.games[1][0];
                    game.result = {
                        homeScore: 34,
                        awayScore: 42
                    };
                    expect(GameHelper.isCorrect(game, 'Patriots')).toBeTruthy();
                });

                it('should return false if the given team is the underdog and the favorite covered', function () {
                    var game = testData.games[1][0];
                    game.result = {
                        homeScore: 34,
                        awayScore: 42
                    };
                    expect(GameHelper.isCorrect(game, 'Oilers')).toBeFalsy();
                });

                it('should return false if the given team is the favorite and the favorite won but did not cover', function () {
                    var game = testData.games[1][0];
                    game.result = {
                        homeScore: 34,
                        awayScore: 40
                    };
                    expect(GameHelper.isCorrect(game, 'Patriots')).toBeFalsy();
                });

                it('should return false if the result is a push', function () {
                    var game = testData.games[1][4];
                    expect(GameHelper.isCorrect(game, 'Giants')).toBeFalsy();
                    expect(GameHelper.isCorrect(game, 'Eagles')).toBeFalsy();
                });

                it('should return false if no result', function () {
                    var game = testData.games[1][5];
                    expect(GameHelper.isCorrect(game, 'Giants')).toBeFalsy();
                    expect(GameHelper.isCorrect(game, 'Eagles')).toBeFalsy();
                });
            });

            describe('getTotalCorrect', function () {
                it('should return a tally of the total correct picks', function () {
                    var games = testData.games[1], picks = testData.picks[1];
                    expect(GameHelper.getTotalCorrect(games, picks.joe)).toBe(4);
                    expect(GameHelper.getTotalCorrect(games, picks.colombo)).toBe(2);
                    expect(GameHelper.getTotalCorrect(games, picks.will)).toBe(0);
                    expect(GameHelper.getTotalCorrect(games, picks.ryan)).toBe(2);
                });
            });
        });
    });
})();