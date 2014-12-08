(function (angular) {
    'use strict';

    angular.module('standings', ['ngRoute', 'services.colomboapi'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/standings', {
                    templateUrl: 'scripts/features/standings/standings.html',
                    controller: 'StandingsCtrl',
                    controllerAs: 'standingsView',
                    resolve: {
                        totals: ['ColomboAPI', function (ColomboAPI) {
                            return ColomboAPI.getTotals();
                        }]
                    }
                })
        }])

        .controller('StandingsCtrl', ['totals', 'UserService', function (totals, UserService) {
            this.totals = totals;

            this.isMe = UserService.isMe;
        }]);
})(angular);