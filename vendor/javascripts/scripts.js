require('angular'); /*global angular*/
require('angular-route');
require('angular-sanitize');
require('angular-local-storage');
require('ng-notie');

var app = angular.module('AtelierScientifique', ['ngNotie', 'ngSanitize', 'ngRoute', 'LocalStorageModule']);
app.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider){
        $routeProvider
        .when('/', {
            templateUrl: 'vendor/views/home.html',
            controller: 'AtelierScientifiqueHomeCtrl'
        })
        .when('/add-player', {
            templateUrl: 'vendor/views/add-player.html',
            controller: 'AtelierScientifiqueAddPlayerCtrl'
        })
        .when('/results-last-player', {
            templateUrl: 'vendor/views/results-last-player.html',
            controller: 'AtelierScientifiqueResultsLastPlayerCtrl'
        })
        .when('/statistics', {
            templateUrl: 'vendor/views/statistics.html',
            controller: 'AtelierScientifiqueStatisticsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
        localStorageServiceProvider
        .setPrefix('atelier-scientifique')
        .setNotify(false, false);
}]);
app.run(['$rootScope', '$location', 'notie', function ($rootScope, $location, notie) {
        $rootScope.$menu = {
            show: function () {
              document.getElementsByTagName('body')[0].classList.add('with-sidebar');
            },
            hide: function (path) {
              document.getElementsByTagName('body')[0].classList.remove('with-sidebar');
              if (path) {
                $location.path(path);
              }
            }
        };
        $rootScope.questions = require('./questions.json');
        $rootScope.$error = function () {
          notie.alert(3, 'Quelque chose s\'est mal passé !', 3);
        };
}]);
app.controller('AtelierScientifiqueHomeCtrl', require('./vendor/javascripts/controllers/home.js'));
app.controller('AtelierScientifiqueAddPlayerCtrl', require('./vendor/javascripts/controllers/add-player.js'));
app.controller('AtelierScientifiqueResultsLastPlayerCtrl', require('./vendor/javascripts/controllers/results-last-player.js'));
app.controller('AtelierScientifiqueStatisticsCtrl', require('./vendor/javascripts/controllers/statistics.js'));
