(function (angular) {
    'use strict';

    angular.module('nflpicks', ['ngRoute', 'ngStorage', 'login', 'picks', 'ngMoment', 'angularSpinner'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/login'
            });
        }])

        .run(['$rootScope', '$location', 'UserService', '$localStorage', function ($rootScope, $location, UserService, $localStorage) {
            if ($localStorage.username) {
                UserService.getCurrentUser().username = $localStorage.username;
            }
            if (!UserService.isLoggedIn()) {
                $location.path('/login');
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

        .directive('jzNavHeader', ['$location', 'UserService', 'UserWeek', function ($location, UserService, UserWeek) {
            return {
                replace: true,
                template:
                    '<div class="header" ng-show="showNavHeader()">' +
                    '    <ul class="nav nav-pills pull-right">' +
                    '        <li ng-repeat="tab in tabs" ng-class="{\'active\': atLocation(tab.path)}"><a ng-href="#{{tab.path}}">{{ tab.title }}</a></li>' +
                    '    </ul>' +
                    '    <h3 class="text-muted">Week {{ getWeek() }}</h3>' +
                    '</div>',
                link: function ($scope) {
                    $scope.tabs = [{
                        path: '/picks',
                        title: 'My Picks'
                    }, {
                        path: '/all-picks',
                        title: 'All Picks'
                    }];
                    $scope.atLocation = function (path) {
                        return $location.path() === path;
                    };
                    $scope.showNavHeader = function () {
                        return UserService.isLoggedIn() && $location.path() !== '/login';
                    };
                    $scope.getCurrentTab = function () {
                        var curTab, path = $location.path();
                        angular.forEach(this.tabs, function (tab) {
                            if (tab.path === path) {
                                curTab = tab;
                            }
                        });
                        return curTab;
                    };
                    $scope.getWeek = function () {
                        return UserWeek.selectedWeek;
                    };
                }
            };
        }]);
})(angular);