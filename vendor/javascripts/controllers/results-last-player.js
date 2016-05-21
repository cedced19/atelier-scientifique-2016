module.exports = ['$scope', '$location', '$rootScope', 'localStorageService', 'notie', function($scope, $location, $rootScope, localStorageService, notie) {
        $rootScope.nav = 'results-last-player';

        var players = localStorageService.get('players');

        $scope.isVerification = function (verification, answer) {
          if (Array.isArray(verification)) {
            for (var i in verification) {
              if (verification[i] == answer) {
                return true;
              }
            }
            return false;
          } else {
            if (verification == answer) {
                return true;
            }
            return false;
          }
        };

        if (players.length > 0) {
          $scope.lastPlayer = players[players.length-1];

          $scope.total = $rootScope.questions.length;
        } else {
          $scope.lastPlayer = false;
        }
}];
