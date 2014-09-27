(function (angular) {
	'use strict';

	angular.module('services.colomboapi', [])

		.service('ColomboAPI', ['$http', 'ColomboAPIConverter', function ($http, ColomboAPIConverter) {
			this.getGames = function (currentWeek) {
				var url = '/games/' + currentWeek;
				return $http.get(url).then(ColomboAPIConverter.convertGamesData);
			};
		}])

		.service('ColomboAPIConverter', [function () {
			this.convertGamesData = function (response) {
				var serverModel = response.data;

				var clientModel = [];
				angular.forEach(serverModel, function (game) {
					var favorite, underdog;
					favorite = game.spread <=0 ? game.home : game.away;
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
		}]);

})(angular);