(function (angular) {
    'use strict';

    angular.module('picks', ['ngRoute', 'services.colomboapi', 'services.weeks', 'services.user'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/picks/:week', {
                    templateUrl: 'scripts/features/picks/picks.html',
                    controller: 'PicksCtrl',
                    controllerAs: 'picksView',
                    resolve: {
                        games: ['GamesService', 'UserWeek', '$route', function (GamesService, UserWeek, $route) {
                            UserWeek.selectedWeek = parseInt($route.current.params.week, 10);
                            return GamesService.getGames();
                        }],
                        picks: ['PicksService', 'UserService', 'UserWeek', '$route', function (PicksService, UserService, UserWeek, $route) {
                            UserWeek.selectedWeek = parseInt($route.current.params.week, 10);
                            return PicksService.getPicksForUser(UserService.getCurrentUser());
                        }]
                    }
                })
                .when('/all-picks/:week', {
                    templateUrl: 'scripts/features/picks/all-picks.html',
                    controller: 'AllPicksCtrl',
                    controllerAs: 'allPicksView',
                    resolve: {
                        games: ['GamesService', 'UserWeek', '$route', function (GamesService, UserWeek, $route) {
                            UserWeek.selectedWeek = parseInt($route.current.params.week, 10);
                            return GamesService.getGames();
                        }],
                        allPicks: ['PicksService', 'UserWeek', '$route', function (PicksService, UserWeek, $route) {
                            UserWeek.selectedWeek = parseInt($route.current.params.week, 10);
                            return PicksService.getPicksForAllUsers();
                        }]
                    }
                });
        }])

        .service('PicksService', ['ColomboAPI', 'UserWeek', 'UserService', 'NFLWeeks', '$q', function (ColomboAPI, UserWeek, UserService, NFLWeeks, $q) {
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
                var promise;
                if (NFLWeeks.isNowAfterDeadlineOfWeek(UserWeek.selectedWeek)) {
                    promise = $q.reject({
                        code: 'too_late'
                    });
                } else {
                    promise = ColomboAPI.updatePicks(picks, UserService.getCurrentUser().id);
                }
                return promise;
            };
        }])

        .service('GamesService', ['ColomboAPI', 'UserWeek', function (ColomboAPI, UserWeek) {
            this.getGames = function () {
                var week = UserWeek.selectedWeek;
                return ColomboAPI.getGames(week);
            };
        }])

        .service('GameHelper', function () {

            function getResultInteger(game) {
                var homeSpread = game.spread;
                if (game.homeTeam === game.favorite) {
                    homeSpread = -1 * game.spread;
                }
                return game.result.homeScore - game.result.awayScore + homeSpread;
            }

            this.isCorrect = function (game, team) {
                var result, correctPick, isCorrect = false;
                if (game.result) {
                    result = getResultInteger(game);
                    if (result > 0) {
                        correctPick = game.homeTeam;
                    } else if (result < 0) {
                        correctPick = game.awayTeam;
                    }

                    isCorrect = team === correctPick;
                }
                return isCorrect;
            };

            this.isIncorrect = function (game, team) {
                return game.result && !this.isCorrect(game, team) && !this.isPush(game);
            };

            this.isPush = function (game) {
                return game.result && getResultInteger(game) === 0;
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

        .controller('PicksCtrl', ['$scope', 'games', 'picks', 'GameHelper', 'PicksService', '$timeout', 'UserWeek', '$location', function ($scope, games, picks, GameHelper, PicksService, $timeout, UserWeek, $location) {
            var errors= {};

            this.games = games;
            this.picks = picks;
            this.gameHelper = GameHelper;
            $scope.$watch(function () {
                return UserWeek.selectedWeek;
            }, function (newValue) {
                $location.path('/picks/' + newValue);
            });

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

        .controller('AllPicksCtrl', ['$scope', 'games', 'allPicks', 'GameHelper', 'UserWeek', '$location', function ($scope, games, allPicks, GameHelper, UserWeek, $location) {
            this.games = games;
            this.allPicks = allPicks;
            this.gameHelper = GameHelper;
            $scope.$watch(function () {
                return UserWeek.selectedWeek;
            }, function (newValue) {
                $location.path('/all-picks/' + newValue);
            });
        }]);
})(angular);