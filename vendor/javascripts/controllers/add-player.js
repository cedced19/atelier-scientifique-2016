module.exports = ['$scope', '$location', '$rootScope', 'localStorageService', 'notie', function($scope, $location, $rootScope, localStorageService, notie) {
        $rootScope.nav = 'add-player';

        $scope.newPlayer = {
          questions: []
        };


        $scope.addPlayer = function () {
          var totalCorrect = 0;

          if (!$scope.newPlayer.name || $scope.newPlayer.name == '') {
            return notie.alert(3, 'Vous devez donner un nom.', 3);
          }

          if (!$scope.newPlayer.firstName || $scope.newPlayer.firstName == '') {
            return notie.alert(3, 'vous devez donnez un prénom.', 3);
          }

          $rootScope.questions.forEach(function (item, key) {
            if ((!item.user || item.user == '') && item.type != 'word') {
              return $scope.newPlayer.questions.push({
                answer: false
              });
            }

            var correct = false;

            if (item.type == 'word') {
              if (item.user.right) {
                correct = true;
                item.user = item.verification;
              } else if (item.user.other || item.user.other != '') {
                item.user = item.user.other;
              } else {
                return $scope.newPlayer.questions.push({
                  answer: false
                });
              }
            }


            if (item.type == 'qcm') {
              if (Array.isArray(item.verification)) {
                item.verification.forEach(function (verification) {
                  if (item.user == verification) {
                    correct = true;
                  }
                });
              } else {
                if (item.user == item.verification) {
                  correct = true;
                }
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
