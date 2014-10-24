(function (angular) {
    'use strict';

    angular.module('nflpicks', ['ngRoute', 'ngStorage', 'ngAnimate', 'directives', 'login', 'picks', 'ngMoment', 'angularSpinner'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/login'
            });
        }])

        .run(['$rootScope', '$location', 'UserService', '$localStorage', function ($rootScope, $location, UserService, $localStorage) {
            if ($localStorage.username) {
                UserService.getCurrentUser().username = $localStorage.username;
                UserService.login().finally(function () {
                    if (!UserService.isLoggedIn()) {
                        $location.path('/login');
                    }
                });
            }

            function onRouteChangeStart() {
                $rootScope.isRouteChanging = true;
                $rootScope.$broadcast('us-spinner:spin', 'main-spinner');
            }
            function onRouteChangeFinished() {
                $rootScope.isRouteChanging = false;
                $rootScope.$broadcast('us-spinner:stop', 'main-spinner');
            }
            $rootScope.$on('$routeChangeStart', onRouteChangeStart);
            $rootScope.$on('$routeChangeSuccess', onRouteChangeFinished);
            $rootScope.$on('$routeChangeError', onRouteChangeFinished);
        }])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/scores', {
                template: '<div>{{ scoresView.score }}</div>',
                controller: 'Scores',
                controllerAs: 'scoresView'
            });
        }])
        .controller('Scores', ['$scope', function ($scope) {
            var scoresView = this;
            scoresView.score = 'No score';

            var scoresStream = new EventSource('scores/24');
            scoresStream.addEventListener('update', function (event) {
                var score = JSON.parse(event.data);
                $scope.$apply(function () {
                    scoresView.score = 'Home score: ' + score.home_score + ', Away score: ' + score.away_score;
                });
                console.log('update received');
                console.log(event);
            });
            scoresStream.addEventListener('open', function (event) {
                console.log('open received');
                console.log(event);
            });
            scoresStream.addEventListener('error', function (event) {
                scoresStream.close();
                console.log('error received');
                console.log(event);
            });
        }]);
})(angular);