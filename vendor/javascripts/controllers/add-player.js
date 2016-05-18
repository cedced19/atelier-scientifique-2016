module.exports = ['$scope', '$location', '$rootScope', 'localStorageService', 'notie', function($scope, $location, $rootScope, localStorageService, notie) {
        $rootScope.nav = 'add-player';

        $scope.newPlayer = {
          questions: []
        };


        $scope.addPlayer = function () {
          var totalCorrect = 0;
          $rootScope.questions.forEach(function (item, key) {
            if (!item.user || item.user == '') {
              return $scope.newPlayer.questions.push({
                answer: false
              });
            }

            var correct = false;
            if (item.type == 'qcm') {
              if (item.user == item.verification) {
                correct = true;
              }
            }
            if (item.type == 'number') {
              if (item.user <= item.verification.max && item.user >= item.verification.min) {
                correct = true;
              }
            }
            $scope.newPlayer.questions.push({
              answer: item.user,
              correct: correct
            });
            if (correct) {
              totalCorrect++;
            }
            $rootScope.questions[key].user = '';
          });
          var players = localStorageService.get('players');
          players.push({
            name: $scope.newPlayer.name,
            firstName: $scope.newPlayer.firstName,
            questions: $scope.newPlayer.questions,
            total: totalCorrect
          });
          localStorageService.set('players', players);
          notie.alert(1, 'Un nouveau participant a été ajouté.', 2);
          $scope.newPlayer = {};
        };
}];
