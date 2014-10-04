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

            $rootScope.$on('startSpinner', function () {
                $rootScope.$broadcast('us-spinner:spin', 'main-spinner');
            });
            $rootScope.$on('stopSpinner', function () {
                $rootScope.$broadcast('us-spinner:stop', 'main-spinner');
            });

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

        .directive('jzNavHeader', ['$location', 'UserService', 'UserWeek', 'REG_SEASON_LEN', '$routeParams', '$interpolate', function ($location, UserService, UserWeek, REG_SEASON_LEN, $routeParams, $interpolate) {
            return {
                replace: true,
                template:
                    '<div class="header" ng-show="showNavHeader()">' +
                    '    <ul class="nav nav-pills pull-right">' +
                    '        <li ng-repeat="tab in tabs" ng-class="{\'active\': atLocation(tab.path)}"><a ng-href="#{{resolvePath(tab.path)}}">{{ tab.title }}</a></li>' +
                    '    </ul>' +
                    '    <h3 class="text-muted">' +
                    '        <div class="left week-arrow" ng-show="showLeftArrow()" ng-click="leftArrowClicked()">&#10094;</div>' +
                    '            Week {{ getWeek() }}' +
                    '        <div class="right week-arrow" ng-show="showRightArrow()" ng-click="rightArrowClicked()">&#10095;</div>' +
                    '    </h3>' +
                    '</div>',
                link: function ($scope) {
                    $scope.tabs = [{
                        path: '/picks/{{week}}',
                        title: 'My Picks'
                    }, {
                        path: '/all-picks/{{week}}',
                        title: 'All Picks'
                    }];

                    $scope.resolvePath = function (path) {
                        function resolveRouteParams() {
                            return {
                                week: UserWeek.selectedWeek
                            };
                        }
                        return $interpolate(path)(resolveRouteParams());
                    };

                    $scope.atLocation = function (path) {
                        return $location.path() === this.resolvePath(path);
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
                    $scope.showLeftArrow = function () {
                        return UserWeek.selectedWeek > 1;
                    };
                    $scope.showRightArrow = function () {
                        return UserWeek.selectedWeek < REG_SEASON_LEN;
                    };
                    $scope.leftArrowClicked = function () {
                        UserWeek.selectedWeek--;
                    };
                    $scope.rightArrowClicked = function () {
                        UserWeek.selectedWeek++;
                    };
                }
            };
        }]);
})(angular);