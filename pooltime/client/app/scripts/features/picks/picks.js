(function (angular) {
    'use strict';

    angular.module('picks', ['ngRoute', 'services.colomboapi', 'services.weeks', 'services.user'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/picks', {
                    templateUrl: 'scripts/features/picks/picks.html',
                    controller: 'PicksCtrl',
                    controllerAs: 'picksView',
                    resolve: {
                        games: ['GamesService', function (GamesService) {
                            return GamesService.getGames();
                        }],
                        picks: ['PicksService', 'UserService', function (PicksService, UserService) {
                            return PicksService.getPicksForUser(UserService.getCurrentUser());
                        }]
                    }
                })
                .when('/all-picks', {
                    templateUrl: 'scripts/features/picks/all-picks.html',
                    controller: 'AllPicksCtrl',
                    controllerAs: 'allPicksView',
                    resolve: {
                        games: ['GamesService', function (GamesService) {
                            return GamesService.getGames();
                        }],
                        allPicks: ['PicksService', function (PicksService) {
                            return PicksService.getPicksForAllUsers();
                        }]
                    }
                });
        }])

        .service('PicksService', ['ColomboAPI', 'UserWeek', 'UserService', function (ColomboAPI, UserWeek, UserService) {
            this.getPicksForUser = function (user) {
                var week = UserWeek.selectedWeek;
                return ColomboAPI.getPicks(week).then(function (picks) {
                    return picks[user.username.toLowerCase()] || {};
                });
            };

            this.getPicksForAllUsers = function () {
                var week = UserWeek.selectedWeek;
                return ColomboAPI.getPicks(week);
            };

            this.updatePicks = function (picks) {
                return ColomboAPI.updatePicks(picks, UserService.getCurrentUser().id);
            };
        }])

        .service('GamesService', ['ColomboAPI', 'UserWeek', function (ColomboAPI, UserWeek) {
            this.getGames = function () {
                var week = UserWeek.selectedWeek;
                return ColomboAPI.getGames(week);
            };
        }])

        .service('GameHelper', function () {

            this.isCorrect = function (game, team) {
                var points, winner, loser, correctPick = null;

                if (game.result) {
                    winner = game.result.winner;
                    if (winner === game.favorite) {
                        points = game.result.pointDifference - game.spread;
                        loser = game.underdog;
                    } else {
                        points = game.result.pointDifference + game.spread;
                        loser = game.favorite;
                    }
                    if (points > 0) {
                        correctPick = winner;
                    } else if (points < 0) {
                        correctPick = loser;
                    }
                }

                return correctPick === team;
            };

            this.getTotalCorrect = function (games, userPicks) {
                var total = 0;
                angular.forEach(games, function (game) {
                    if (this.isCorrect(game, userPicks[game.id])) {
                        total++;
                    }
                }, this);
                return total;
            };

        })

        .controller('PicksCtrl', ['games', 'picks', 'GameHelper', 'PicksService', '$timeout', function (games, picks, GameHelper, PicksService, $timeout) {
            var errors= {};

            this.games = games;
            this.picks = picks;
            this.gameHelper = GameHelper;

            function addError(id, error) {
                errors[id] = error;
            }

            // adds and removes an error after 1.5 seconds
            function addTemporaryError(id, error) {
                addError(id, error);
                $timeout(function () {
                    delete errors[id];
                }, 1500, true);
            }

            this.hasError = function (id) {
                return !!errors[id];
            };

            this.getError = function (id) {
                return errors[id];
            };

            this.isPick = function (game, team) {
                return team && picks[game.id] === team;
            };

            this.pickTeam = function (game, team) {
                var originalPick = picks[game.id];
                function handleError(error) {
                    if (error.code === 'too_late') {
                        addTemporaryError(game.id, 'Too late, bitch!');
                    } else {
                        addTemporaryError(game.id, 'Oh shit! We fucked up!');
                    }
                    picks[game.id] = originalPick;
                }
                picks[game.id] = team;
                PicksService.updatePicks(picks)
                    .catch(handleError);
            };
        }])

        .controller('AllPicksCtrl', ['games', 'allPicks', 'GameHelper', function (games, allPicks, GameHelper) {
            this.games = games;
            this.allPicks = allPicks;
            this.gameHelper = GameHelper;
        }]);
})(angular);