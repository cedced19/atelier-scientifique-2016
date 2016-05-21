module.exports = ['$scope', '$location', '$rootScope', 'localStorageService', 'notie', function($scope, $location, $rootScope, localStorageService, notie) {
        $rootScope.nav = 'statistics';

        $scope.players = localStorageService.get('players');

        $scope.totalAnswers = [];

        var isInside = function (key) {
          for (var i in $scope.totalAnswers) {
            if ($scope.totalAnswers[i].sentence == $rootScope.questions[key].sentence) {
              return true;
            }
          }
          return false;
        };

        $scope.isPlural = function (value) {
          if (value <= 1) {
            return ''
          }
          return 's';
        };

        $scope.players.forEach(function (player) {
          player.questions.forEach(function (question, key) {
              if (isInside(key)) {
                if (question.correct) {
                  $scope.totalAnswers[key].total++;
                }
              } else {
                var total = 0;
                if (question.correct) {
                  total = 1;
                }
                $scope.totalAnswers.push({
                  total: total,
                  sentence: $rootScope.questions[key].sentence,
                  id: key + 1
                });
             }
          });
        });

}];
