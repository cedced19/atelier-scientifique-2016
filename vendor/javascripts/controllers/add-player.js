module.exports = ['$scope', '$location', '$rootScope', 'localStorageService', 'notie', function($scope, $location, $rootScope, localStorageService, notie) {
        $rootScope.nav = 'add-player';
        $scope.newPlayer = {};
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
