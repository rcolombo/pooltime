(function (angular) {
	'use strict';

	var FakeData = {};

	FakeData.PicksForAllUsers = {
		'joe': {
			'lkj': 'PACKERS',
			'asdf': 'PATRIOTS',
			'qwert': 'LIONS',
			'zxc': 'CHARGERS'
		},
		'ryan': {
			'lkj': 'SEAHAWKS',
			'asdf': 'PATRIOTS',
			'qwert': 'GIANTS',
			'zxc': 'CHARGERS'
		},
		'will': {
			'lkj': 'SEAHAWKS',
			'asdf': 'DOLPHINS',
			'qwert': 'GIANTS',
			'zxc': 'CHARGERS'
		},
		'colombo': {
			'lkj': 'PACKERS',
			'asdf': 'PATRIOTS',
			'qwert': 'LIONS',
			'zxc': 'CHARGERS'
		}
	};

	FakeData.ThisWeeksMatchups = [{
		id: 'lkj',
		homeTeam: 'SEAHAWKS',
		awayTeam: 'PACKERS',
		favorite: 'SEAHAWKS',
		underdog: 'PACKERS',
		spread: 5.5,
		result: {
			winner: 'SEAHAWKS',
			pointDifference: 36
		}
	}, {
		id: 'asdf',
		homeTeam: 'DOLPHINS',
		awayTeam: 'PATRIOTS',
		favorite: 'PATRIOTS',
		underdog: 'DOLPHINS',
		spread: 6,
		result: {
			winner: 'DOLPHINS',
			pointDifference: 13
		}
	}, {
		id: 'qwert',
		homeTeam: 'LIONS',
		awayTeam: 'GIANTS',
		favorite: 'LIONS',
		underdog: 'GIANTS',
		spread: 6.5,
		result: null
	}, {
		id: 'zxc',
		homeTeam: 'CARDINALS',
		awayTeam: 'CHARGERS',
		favorite: 'CARDINALS',
		underdog: 'CHARGERS',
		spread: 3,
		result: null
	}];

	angular.module('picks', ['ngRoute', 'services.colomboapi', 'ngMoment'])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/picks', {
					templateUrl: 'scripts/features/picks/picks.html',
					controller: 'PicksCtrl',
					controllerAs: 'picksView',
					resolve: {
						thisWeeksMatchups: ['MatchupsService', function (MatchupsService) {
							return MatchupsService.getThisWeeksMatchups();
						}],
						picks: ['PicksService', 'UserService', function (PicksService, UserService) {
							return PicksService.getThisWeeksPicksForUser(UserService.getCurrentUser());
						}]
					}
				})
				.when('/all-picks', {
					templateUrl: 'scripts/features/picks/all-picks.html',
					controller: 'AllPicksCtrl',
					controllerAs: 'allPicksView',
					resolve: {
						thisWeeksMatchups: ['MatchupsService', function (MatchupsService) {
							return MatchupsService.getThisWeeksMatchups();
						}],
						allPicks: ['PicksService', function (PicksService) {
							return PicksService.getThisWeeksPicksForAllUsers();
						}]
					}
				});
		}])

		.service('NFLWeeks', ['$moment', function ($moment) {
			var REG_SEASON_LEN = 17, WEEK_1_START_DATE = '2014-09-03';

			this.Week = (function initWeeks(startDate) {
				var week = {}, weekNumber;
				startDate = $moment(startDate).startOf('day');
				for (weekNumber = 1; weekNumber <= REG_SEASON_LEN; weekNumber++) {
					week[weekNumber] = {
						start: $moment(startDate),
						end: $moment(startDate).add(6, 'days').endOf('day')
					};
					startDate = $moment(startDate).add(7, 'days');
				}
				return week;
			}(WEEK_1_START_DATE));

			this.getCurrentWeek = function () {
				var now = $moment().zone('-0500'), result = null; // EST time zone
				angular.forEach(this.Week, function (week, weekNumber) {
					if (now.isSame(week.start) || now.isAfter(week.start) && now.isBefore(week.end)) {
						result = weekNumber;
					}
				});
				return result;
			};
		}])

		.service('PicksService', ['$q', function ($q) {
			this.getThisWeeksPicksForUser = function (user) {
				return $q.when(FakeData.PicksForAllUsers[user.username.toLowerCase()]);
			};

			this.getThisWeeksPicksForAllUsers = function () {
				return $q.when(FakeData.PicksForAllUsers);
			};

			this.updatePicks = function (picks) {
				return $q.reject({ code: 'unknown' });
			};
		}])

		.service('MatchupsService', ['ColomboAPI', 'NFLWeeks', function (ColomboAPI, NFLWeeks) {
			this.getThisWeeksMatchups = function () {
				var currentWeek = NFLWeeks.getCurrentWeek();
				return ColomboAPI.getGames(currentWeek);
			};
		}])

		.service('ScoreHelper', function () {

			this.isCorrect = function (matchup, team) {
				var points, winner, loser, correctPick = null;

				if (matchup.result) {
					winner = matchup.result.winner;
					if (winner === matchup.favorite) {
						points = matchup.result.pointDifference - matchup.spread;
						loser = matchup.underdog;
					} else {
						points = matchup.result.pointDifference + matchup.spread;
						loser = matchup.favorite;
					}
					if (points > 0) {
						correctPick = winner;
					} else if (points < 0) {
						correctPick = loser;
					}
				}

				return correctPick === team;
			};

			this.getTotalCorrect = function (matchups, userPicks) {
				var total = 0;
				angular.forEach(matchups, function (matchup) {
					if (this.isCorrect(matchup, userPicks[matchup.id])) {
						total++;
					}
				}, this);
				return total;
			};

		})

		.controller('PicksCtrl', ['thisWeeksMatchups', 'picks', 'ScoreHelper', 'PicksService', '$timeout', function (thisWeeksMatchups, picks, ScoreHelper, PicksService, $timeout) {
			var errors= {};

			this.matchups = thisWeeksMatchups;
			this.picks = picks;
			this.scoreHelper = ScoreHelper;

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

			this.isPick = function (matchup, team) {
				return picks[matchup.id] === team;
			};

			this.pickTeam = function (matchup, team) {
				var originalPick = picks[matchup.id];
				function handleError(error) {
					if (error.code === 'too_late') {
						addTemporaryError(matchup.id, 'Too late, bitch!');
					} else {
						addTemporaryError(matchup.id, 'Oh shit! We fucked up!');
					}
					picks[matchup.id] = originalPick;
				}
				picks[matchup.id] = team;
				PicksService.updatePicks(picks)
					.catch(handleError);
			};
		}])

		.controller('AllPicksCtrl', ['thisWeeksMatchups', 'allPicks', 'ScoreHelper', function (thisWeeksMatchups, allPicks, ScoreHelper) {
			this.matchups = thisWeeksMatchups;
			this.allPicks = allPicks;
			this.scoreHelper = ScoreHelper;
		}]);
})(angular);