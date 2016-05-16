module.exports = ['$scope', '$location', '$rootScope', 'localStorageService', 'notie', function($scope, $location, $rootScope, localStorageService, notie) {
        $rootScope.nav = 'results-last-player';

        var players = localStorageService.get('players');

        if (players.length > 0) {
          $scope.lastPlayer = players[players.length-1];
          $scope.total = {
            right: 0,
            total: 0
          };

          $scope.lastPlayer.questions.forEach(function (item) {
            if (item.answer !== false) {
              if (item.correct) {
                $scope.total.right++;
              }
            }
            $scope.total.total++;
          });
        } else {
          $scope.lastPlayer = false;
        }
}];
