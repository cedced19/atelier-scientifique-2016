module.exports = ['$scope', '$location', '$rootScope', 'localStorageService', 'notie', function($scope, $location, $rootScope, localStorageService, notie) {
        $rootScope.nav = 'add-player';

        $scope.newPlayer = {};
        $scope.questions = {
          qcms: [],
          numbers: [],
          others: []
        };

        $rootScope.questions.forEach(function (item) {
          if (item.type == 'qcm') {
            $scope.questions.qcms.push(item);
          } else if (item.type == 'number') {
            $scope.questions.numbers.push(item);
          } else {
            $scope.questions.others.push(item);
          }
        });


        $scope.addPlayer = function () {
          var players = localStorageService.get('players');
          players.push({
            name: $scope.newPlayer.name,
            firstName: $scope.newPlayer.firstName
          });
          localStorageService.set('players', players);
          notie.alert(1, 'Un nouveau participant a été ajouté.', 2);
          $scope.newPlayer = {};
        };
}];
