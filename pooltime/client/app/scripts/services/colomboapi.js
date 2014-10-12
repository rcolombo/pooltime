(function (angular) {
    'use strict';

    angular.module('services.colomboapi', [])

        .service('ColomboAPI', ['$http', 'ColomboAPIConverter', function ($http, ColomboAPIConverter) {
            function responseToGames(response) {
                return ColomboAPIConverter.gamesServerToClient(response.data);
            }
            this.getGames = function (week) {
                var url = 'games/' + week;
                return $http.get(url).then(responseToGames);
            };

            function responseToPicks(response) {
                return ColomboAPIConverter.picksServerToClient(response.data);
            }
            this.getPicks = function (week) {
                var url = 'picks/' + week;
                return $http.get(url).then(responseToPicks);
            };

            this.login = function (username) {
                var url = 'lookup';
                return $http.get(url, {
                    params: {
                        user: username.toLowerCase()
                    }
                }).then(function (response) {
                    return response.data;
                });
            };

            this.updatePicks = function (picks, userId) {
                var url = 'picks', selections;
                selections = ColomboAPIConverter.picksClientToServer(picks);
                return $http.put(url, {
                    'user_id': userId,
                    'selections': selections
                });
            };
        }])

        .service('ColomboAPIConverter', [function () {
            this.gamesServerToClient = function (serverModel) {
                function parseResult(homeScore, awayScore) {
                    var result = null;
                    if (typeof homeScore === 'number' || typeof awayScore === 'number') {
                        result = {
                            homeScore: homeScore || 0,
                            awayScore: awayScore || 0
                        };
                    }
                    return result;
                }
                var clientModel = [];
                angular.forEach(serverModel, function (game) {
                    var favorite, underdog;
                    favorite = game.spread <= 0 ? game.home : game.away;
                    underdog = game.spread > 0 ? game.home : game.away;
                    clientModel.push({
                        id: game.id,
                        homeTeam: game.home,
                        awayTeam: game.away,
                        favorite: favorite,
                        underdog: underdog,
                        spread: Math.abs(game.spread),
                        result: parseResult(game.home_score, game.away_score)
                    });
                });
                return clientModel;
            };

            this.picksServerToClient = function (serverModel) {
                var clientModel = {};
                angular.forEach(serverModel, function (picks, username) {
                    var userPicks = clientModel[username.toLowerCase()] = {};
                    angular.forEach(picks, function (pick) {
                        userPicks[pick.game_id] = pick.team;
                    });
                });
                return clientModel;
            };

            this.picksClientToServer = function (clientModel) {
                var serverModel = [];
                angular.forEach(clientModel, function (pick, gameId) {
                    serverModel.push({
                        'game_id': gameId,
                        'team': pick
                    });
                });
                return serverModel;
            };
        }]);

})(angular);