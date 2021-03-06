(function (angular) {
    'use strict';

    angular.module('picks', ['ngRoute', 'services.colomboapi', 'services.weeks', 'services.user', 'services.topindicator'])

        .config(function ($routeProvider) {
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
        })

        .service('PicksService', function (ColomboAPI, UserWeek, UserService, NFLWeeks, $q) {
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
        })

        .service('GamesService', function (ColomboAPI, UserWeek) {
            this.getGames = function () {
                var week = UserWeek.selectedWeek;
                return ColomboAPI.getGames(week);
            };
        })

        .service('GameHelper', function () {

            function getResultInteger(game) {
                return game.result.homeScore - game.result.awayScore + game.spread;
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

        .controller('PicksCtrl', function ($scope, games, picks, GameHelper, PicksService, UserWeek, NFLWeeks, $location, TopIndicator) {
            this.games = games;
            this.picks = picks;
            this.gameHelper = GameHelper;
            $scope.$watch(function () {
                return UserWeek.selectedWeek;
            }, function (newValue) {
                $location.path('/picks/' + newValue);
            });

            function addError(message) {
                TopIndicator.setMessage(message, 'error');
            }
            function addSuccessMessage(message) {
                TopIndicator.setMessage(message, 'success');
            }

            this.isPick = function (game, team) {
                return team && picks[game.id] === team;
            };

            this.pickTeam = function (game, team) {
                var originalPick = picks[game.id];
                function handleSuccess() {
                    addSuccessMessage('Saved!');
                }
                function handleError(error) {
                    if (error.code === 'too_late') {
                        addError('Too late, bitch!');
                    } else {
                        addError('Whoopsies!');
                    }
                    picks[game.id] = originalPick;
                }
                if (this.isPickable(game, team)) {
                    picks[game.id] = team;
                    PicksService.updatePicks(picks)
                        .then(handleSuccess)
                        .catch(handleError);
                }
            };

            this.isPickable = function (game, pick) {
                return !this.isPick(game, pick) && !NFLWeeks.isNowAfterDeadlineOfWeek(UserWeek.selectedWeek) && !game.result;
            };
        })

        .controller('AllPicksCtrl', function ($scope, games, allPicks, GameHelper, UserWeek, $location) {
            this.games = games;
            this.allPicks = allPicks;
            this.gameHelper = GameHelper;
            $scope.$watch(function () {
                return UserWeek.selectedWeek;
            }, function (newValue) {
                $location.path('/all-picks/' + newValue);
            });
        });
})(angular);