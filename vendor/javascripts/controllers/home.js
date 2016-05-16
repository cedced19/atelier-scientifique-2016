module.exports = ['$scope', '$location', '$rootScope', 'localStorageService', 'notie', function($scope, $location, $rootScope, localStorageService, notie) {
        $rootScope.nav = 'home';
        if(!Array.isArray(localStorageService.get('players'))) {
          localStorageService.set('players', [])
        }
        $scope.total = localStorageService.get('players').length;

      	const json2csv = require('json2csv');
      	const path = require('path');
      	const fs = require('fs');

        const fields = [
            {
              label: 'Nom',
              value: 'name',
              default: 'NULL'
            },
            {
              label: 'Prénom',
              value: 'firstName',
              default: 'NULL'
            }
        ];

        $rootScope.questions.forEach(function (item, key) {
          fields.push({
            label: `Question ${key + 1}  ` + item.sentence,
            value: `questions[${key}].correct`,
            default: 'NULL'
          })
        });

        $scope.saveCSV = function () {
          var data = localStorageService.get('players');
          data.forEach(function (player) {
            player.questions.forEach(function (item, key) {
              if (item.answer !== false && item.correct === true) {
                player.questions[key].correct = 1;
              } else {
                player.questions[key].correct = 0;
              }
            })
          });
          json2csv({data: data, fields: fields}, (err, csv) => {
        		if (err) return $rootScope.error();
        		fs.writeFile(path.dirname(process.execPath) + '/players.csv', csv, (err) => {
        			if (err) return $rootScope.error();
        			notie.alert(1,'Fichier sauvegardé au format CSV à la racine du logiciel.',2);
        		});
        	});
        };

        $scope.saveJSON = function () {
          fs.writeFile(path.dirname(process.execPath) + '/players.json', JSON.stringify(localStorageService.get('players')), (err) => {
            if (err) return $rootScope.error();
            notie.alert(1,'Fichier sauvegardé au format JSON à la racine du logiciel.',2);
          });
        };

}];
