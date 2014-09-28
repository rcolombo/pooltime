(function () {
    'use strict';

    var testData = {};

    testData.WEEK_3_GAMES = [{'week': 3, 'home': 'Tampa Bay', 'away': 'Atlanta', 'spread': 6.5, 'id': 36}, {'week': 3, 'home': 'Green Bay', 'away': 'Detroit', 'spread': 1.0, 'id': 37}, {'week': 3, 'home': 'Tennessee', 'away': 'Cincinnati', 'spread': 6.5, 'id': 38}, {'week': 3, 'home': 'Dallas', 'away': 'St. Louis', 'spread': -2.0, 'id': 39}, {'week': 3, 'home': 'Washington', 'away': 'Philadelphia', 'spread': 4.5, 'id': 40}, {'week': 3, 'home': 'Oakland', 'away': 'New England', 'spread': 14.0, 'id': 41}, {'week': 3, 'home': 'Houston', 'away': 'N.Y. Giants', 'spread': 1.0, 'id': 42}, {'week': 3, 'home': 'San Diego', 'away': 'Buffalo', 'spread': 2.5, 'id': 43}, {'week': 3, 'home': 'Indianapolis', 'away': 'Jacksonville', 'spread': -7.0, 'id': 44}, {'week': 3, 'home': 'Minnesota', 'away': 'New Orleans', 'spread': 10.0, 'id': 45}, {'week': 3, 'home': 'Baltimore', 'away': 'Cleveland', 'spread': -1.0, 'id': 46}, {'week': 3, 'home': 'San Francisco', 'away': 'Arizona', 'spread': -3.0, 'id': 47}, {'week': 3, 'home': 'Kansas City', 'away': 'Miami', 'spread': 4.0, 'id': 48}, {'week': 3, 'home': 'Denver', 'away': 'Seattle', 'spread': 4.0, 'id': 49}, {'week': 3, 'home': 'Pittsburgh', 'away': 'Carolina', 'spread': 3.0, 'id': 50}, {'week': 3, 'home': 'Chicago', 'away': 'N.Y. Jets', 'spread': 3.0, 'id': 51}];
    testData.WEEK_3_PICKS = {'Will': [{'game_id': 42, 'team': 'N.Y. Giants'}, {'game_id': 36, 'team': 'Atlanta'}, {'game_id': 39, 'team': 'St. Louis'}, {'game_id': 38, 'team': 'Cincinnati'}, {'game_id': 48, 'team': 'Miami'}, {'game_id': 49, 'team': 'Seattle'}, {'game_id': 46, 'team': 'Cleveland'}, {'game_id': 47, 'team': 'San Francisco'}, {'game_id': 44, 'team': 'Indianapolis'}, {'game_id': 45, 'team': 'New Orleans'}, {'game_id': 51, 'team': 'Chicago'}, {'game_id': 43, 'team': 'San Diego'}, {'game_id': 40, 'team': 'Philadelphia'}, {'game_id': 41, 'team': 'Oakland'}, {'game_id': 37, 'team': 'Green Bay'}, {'game_id': 50, 'team': 'Carolina'}], 'Colombo': [{'game_id': 42, 'team': 'N.Y. Giants'}, {'game_id': 36, 'team': 'Atlanta'}, {'game_id': 39, 'team': 'Dallas'}, {'game_id': 38, 'team': 'Cincinnati'}, {'game_id': 48, 'team': 'Miami'}, {'game_id': 49, 'team': 'Seattle'}, {'game_id': 46, 'team': 'Cleveland'}, {'game_id': 47, 'team': 'San Francisco'}, {'game_id': 44, 'team': 'Jacksonville'}, {'game_id': 45, 'team': 'New Orleans'}, {'game_id': 51, 'team': 'Chicago'}, {'game_id': 43, 'team': 'Buffalo'}, {'game_id': 40, 'team': 'Philadelphia'}, {'game_id': 41, 'team': 'Oakland'}, {'game_id': 37, 'team': 'Green Bay'}, {'game_id': 50, 'team': 'Carolina'}], 'Joe': [{'game_id': 42, 'team': 'Houston'}, {'game_id': 36, 'team': 'Atlanta'}, {'game_id': 39, 'team': 'Dallas'}, {'game_id': 38, 'team': 'Cincinnati'}, {'game_id': 48, 'team': 'Kansas City'}, {'game_id': 49, 'team': 'Denver'}, {'game_id': 46, 'team': 'Cleveland'}, {'game_id': 47, 'team': 'San Francisco'}, {'game_id': 44, 'team': 'Jacksonville'}, {'game_id': 45, 'team': 'New Orleans'}, {'game_id': 51, 'team': 'N.Y. Jets'}, {'game_id': 43, 'team': 'San Diego'}, {'game_id': 40, 'team': 'Washington'}, {'game_id': 41, 'team': 'New England'}, {'game_id': 37, 'team': 'Detroit'}, {'game_id': 50, 'team': 'Carolina'}], 'Ryan': [{'game_id': 42, 'team': 'N.Y. Giants'}, {'game_id': 36, 'team': 'Atlanta'}, {'game_id': 39, 'team': 'Dallas'}, {'game_id': 38, 'team': 'Cincinnati'}, {'game_id': 48, 'team': 'Kansas City'}, {'game_id': 49, 'team': 'Seattle'}, {'game_id': 46, 'team': 'Cleveland'}, {'game_id': 47, 'team': 'San Francisco'}, {'game_id': 44, 'team': 'Indianapolis'}, {'game_id': 45, 'team': 'New Orleans'}, {'game_id': 51, 'team': 'Chicago'}, {'game_id': 43, 'team': 'San Diego'}, {'game_id': 40, 'team': 'Washington'}, {'game_id': 41, 'team': 'Oakland'}, {'game_id': 37, 'team': 'Detroit'}, {'game_id': 50, 'team': 'Carolina'}]};
    testData.CLIENT_PICKS_FOR_JOE = {
        42: 'Houston',
        36: 'Atlanta',
        39: 'Dallas'
    };
    describe('services.colomboapi', function () {
        describe('ColomboAPI', function () {
            var ColomboAPI, ColomboAPIConverter, $httpBackend;
            beforeEach(function () {
                ColomboAPIConverter = {
                    gamesServerToClient: function (data) {
                        this.convertedGames = data;
                        return data;
                    },
                    picksServerToClient: function (data) {
                        this.convertedPicks = data;
                        return data;
                    }
                };
                function providerOverride($provide) {
                    $provide.value('ColomboAPIConverter', ColomboAPIConverter);
                }
                module('services.colomboapi', providerOverride);
                inject(function (_ColomboAPI_, _$httpBackend_) {
                    ColomboAPI = _ColomboAPI_;
                    $httpBackend = _$httpBackend_;
                });
            });

            describe('getGames', function () {
                it('should make a request, return a promise, and convert the data on success', function () {
                    var returnsPromise = false;
                    $httpBackend.expectGET('games/3').respond(200, testData.WEEK_3_GAMES);
                    ColomboAPI.getGames(3).then(function () {
                        returnsPromise = true;
                    });
                    $httpBackend.flush();

                    expect(ColomboAPIConverter.convertedGames).toEqual(testData.WEEK_3_GAMES);
                    expect(returnsPromise).toBe(true);
                });
            });

            describe('getPicks', function () {
                it('should make a request, return a promise, and convert the data on success', function () {
                    var returnsPromise = false;
                    $httpBackend.expectGET('picks/3').respond(200, testData.WEEK_3_PICKS);
                    ColomboAPI.getPicks(3).then(function () {
                        returnsPromise = true;
                    });
                    $httpBackend.flush();

                    expect(ColomboAPIConverter.convertedPicks).toEqual(testData.WEEK_3_PICKS);
                    expect(returnsPromise).toBe(true);
                });
            });
        });

        describe('ColomboAPIConverter', function () {
            var ColomboAPIConverter;
            beforeEach(function () {
                module('services.colomboapi');
                inject(function (_ColomboAPIConverter_) {
                    ColomboAPIConverter = _ColomboAPIConverter_;
                });
            });

            describe('gamesServerToClient', function () {
                it('should convert the data properly', function () {
                    var result = ColomboAPIConverter.gamesServerToClient(testData.WEEK_3_GAMES);
                    expect(result.length).toBe(16);
                    expect(result[0].id).toBe(36);
                    expect(result[0].homeTeam).toBe('Tampa Bay');
                    expect(result[0].awayTeam).toBe('Atlanta');
                    expect(result[0].favorite).toBe('Atlanta');
                    expect(result[0].underdog).toBe('Tampa Bay');
                    expect(result[0].spread).toBe(6.5);
                    expect(result[3].id).toBe(39);
                    expect(result[3].homeTeam).toBe('Dallas');
                    expect(result[3].awayTeam).toBe('St. Louis');
                    expect(result[3].favorite).toBe('Dallas');
                    expect(result[3].underdog).toBe('St. Louis');
                    expect(result[3].spread).toBe(2);
                });
            });

            describe('picksServerToClient', function () {
                it('should convert the data properly', function () {
                    var result, joesPicks;
                    result = ColomboAPIConverter.picksServerToClient(testData.WEEK_3_PICKS);
                    joesPicks = result.Joe;
                    expect(joesPicks[testData.WEEK_3_GAMES[0].id]).toBe('Atlanta');
                    expect(joesPicks[testData.WEEK_3_GAMES[1].id]).toBe('Detroit');
                });
            });

            describe('picksClientToServer', function () {
                it('should convert the data properly', function () {
                    var result;
                    result = ColomboAPIConverter.picksClientToServer(testData.CLIENT_PICKS_FOR_JOE);
                    expect(result.length).toBe(3);
                    expect(result).toContain({
                        'game_id': '42',
                        'team': 'Houston'
                    });
                    expect(result).toContain({
                        'game_id': '36',
                        'team': 'Atlanta'
                    });
                    expect(result).toContain({
                        'game_id': '39',
                        'team': 'Dallas'
                    });
                });
            });
        });
    });
})();