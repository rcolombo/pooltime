(function (angular) {
    'use strict';

    angular.module('services.colomboapi', [])

        .service('ColomboAPI', ['$http', 'ColomboAPIConverter', function ($http, ColomboAPIConverter) {
            function responseToGames(response) {
                ColomboAPIConverter.convertGamesData(response.data);
            }
            this.getGames = function (week) {
                var url = '/games/' + week;
                return $http.get(url).then(responseToGames);
            };

            function responseToPicks(response) {
                return ColomboAPIConverter.convertPicksData(response.data);
            }
            this.getPicks = function (week) {
                var url = '/picks/' + week;
                return $http.get(url).then(responseToPicks);
            };
        }])

        .service('ColomboAPIConverter', [function () {
            this.convertGamesData = function (serverModel) {
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
                        result: game.result || null
                    });
                });

                return clientModel;
            };

            this.convertPicksData = function (serverModel) {
                var clientModel = {};
                angular.forEach(serverModel, function (picks, username) {
                    var userPicks = clientModel[username] = {};
                    angular.forEach(picks, function (pick) {
                        userPicks[pick.game_id] = pick.team;
                    });
                });
                return clientModel;
            };
        }]);

})(angular);