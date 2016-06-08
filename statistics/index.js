const existsFile = require('exists-file');
const colors = require('colors');
const median = require('./lib/median');
const quartile = require('./lib/quartile');
const path = require('path');

if (!existsFile.sync(path.join(__dirname, '/players.json'))) {
  console.log('No players.json file.'.red);
  process.exit(1);
}

var players = require(path.join(__dirname, '/players.json'));
var questions = require(path.join(__dirname, '../questions.json'));

// Get all answers from players
players.forEach((player) => {
  player.questions.forEach((value, key) => {

    // Check if there is an answer
    if (value.answer !== false) {
      if (!questions[key].hasOwnProperty('answered')) questions[key].answered = 0;
      questions[key].answered++;

      // Check if the answer is correct
      if (value.correct) {
        if (!questions[key].hasOwnProperty('correct')) questions[key].correct = 0;
        questions[key].correct++;
      }

      // Save numbers
      if (questions[key].type == 'number') {
          if (!questions[key].hasOwnProperty('numbers')) questions[key].numbers = [];
          questions[key].numbers.push(value.answer);
      }
    }
  });
});

questions.forEach((question, key) => {
  question.rate = {
    correct: Math.floor((question.correct / question.answered) * 100),
    answer: Math.floor((question.answered / players.length) * 100)
  }

  console.log(colors.bold('Question n°' + (key+1)));
  console.log(question.sentence);
  console.log(`\nParmi ceux qui ont participer au questionnaire ${colors.green(question.rate.answer, '%')} soit ${colors.green(question.answered)} personnes ont répondu à cette question.`);
  console.log(`Parmi ceux qui ont répondu à cette question ${colors.green(question.rate.correct, '%')} soit ${colors.green(question.correct)} personnes ont bien répondu.`);
  console.log('\n');

  if (question.type == 'number') {
    let numbers = question.numbers.sort(function(a, b){return a-b});
    let average = Math.round(numbers.map(function(x,i,arr){return x/arr.length}).reduce(function(a,b){return a + b}));

    console.log(`Il fallait donné un nombre entre ${colors.green(question.verification.min)} et ${colors.green(question.verification.max)}.`);
    console.log('\n');
    console.log(`Les nombres donné pour cette réponse vont de ${colors.green(numbers[0])} à ${colors.green(numbers[numbers.length-1])}.`);
    console.log(`La moyenne est de ${colors.green(average)}.`);
    console.log(`Le premier quartile est de ${colors.green(quartile(numbers, 1))}, la mediane est de ${colors.green(median(numbers))}, et le troisième quartile est de ${colors.green(quartile(numbers, 3))}.`);
    console.log('\n');
  }
});
