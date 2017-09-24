/*jshint esversion: 6 */

let currentGame;
let strict = false;
let gameOn = false;
let maxLength = 20;

const infoBar = document.querySelector("#info");
infoBar.innerHTML = 'Press start below, and pay close attention! Especially as the game speeds up.';

const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const green = document.querySelector("#green");
const yellow = document.querySelector("#yellow");
const grid = [
  {cell: 0, color: 'red', baseColor: '#ff2626', highlightColor: '#fc5555', el: red},
  {cell: 1, color: 'blue', baseColor: '#1943ff', highlightColor: '#728cff', el: blue},
  {cell: 2, color: 'green', baseColor: '#2a912b', highlightColor: '#49fc4a', el: green},
  {cell: 3, color: 'yellow', baseColor: '#ffe419', highlightColor: '#ffed6b', el: yellow}
];

const Game = function() {
  this.game = {
    strict: strict,
    currentPattern: [],
    selectedPattern: [],
    maxLength: maxLength,
    patternLength: 1,
    attempts: 0,
    speed: 1
  };
};
Game.prototype.incrementPattern = function(){
  this.game.patternLength += 1;
};
Game.prototype.addToPattern = function(length) {
  const cellIdx = Math.floor(Math.random() * 4);
  this.game.currentPattern.push(cellIdx);
};
Game.prototype.displayPattern = function(pattern) {
  console.log(`Displaying: ${pattern}`);
  setTimeout(() => {
    let idx = 0;

    const highlight = (cell) => {
      cell.el.style.backgroundColor = cell.highlightColor;
      setTimeout(() => {
        cell.el.style.backgroundColor = cell.baseColor;
      }, 1000 / this.game.speed);
    };

    const next = () => {
      const cell = grid[this.game.currentPattern[idx]];
      highlight(cell);
      idx++;
    };
    next();

    const highlighter = setInterval(function () {
      if (idx >= this.game.currentPattern.length) {
        clearTimeout(highlighter);
        return;
      }
      next();
    }.bind(this), 1500 / this.game.speed);
  }, 1000);
};
Game.prototype.resetTurn = function(){
  this.game.selectedPattern = [];
  this.game.patternLength += 1;
};
Game.prototype.takeTurn = function() {
  this.addToPattern(this.game.patternLength);
  this.displayPattern(this.game.currentPattern);
};
Game.prototype.addUserSelection = function(e) {
  this.game.selectedPattern.push(e.target.id); // ex: 'green'
  if (this.game.selectedPattern.length === this.game.currentPattern.length) {
    this.checkAnswer();
  }
};
Game.prototype.checkAnswer = function() {
  const winner = this.game.selectedPattern.filter((color, i) => {
    return color === grid[this.game.currentPattern[i]].color;
  }).length === this.game.currentPattern.length;

  if (!winner && this.game.attempts !== 3) {
    if (strict) {
      this.takeTurn();
    }
    else {
      this.displayInfo('WRONG_STRICT');
      this.game.attempts += 1;
      this.resetTurn();
      this.displayPattern(this.game.currentPattern);
    }
  }
  else if (!winner && this.game.attempts === 3) {
    this.displayInfo('GAMEOVER_MAX');
    this.reset();
  }
  else if (winner && this.game.currentPattern === this.game.maxLength) {
    this.displayInfo('WIN');
  }
  else {
    this.displayInfo('NEW_PATTERN');
    this.resetTurn();
    this.takeTurn();
  }
};
Game.prototype.start = function() {
  this.displayInfo('START');
  this.game.started = true;
  this.takeTurn();
};
Game.prototype.reset = function() {
  this.displayInfo('RESET');
  this.game.started = false;
};
Game.prototype.clearInfo = function() {
  infoBar.innerHTML = '';
};
Game.prototype.displayInfo = function(action) {
  switch (action) {
    case ('INIT'):
      infoBar.innerHTML = 'Press start below, and pay close attention! Especially as the game speeds up.';
      break;
    case ('START'):
      infoBar.innerHTML = 'Starting game';
      break;
    case ('RESET'):
      infoBar.innerHTML = 'Restting game';
      break;
    case ('NEW_PATTERN'):
      infoBar.innerHTML = 'Good job! Making a new pattern.';
      break;
    case ('WRONG_STRICT'):
      infoBar.innerHTML = 'Wrong! Displaying pattern again.';
      break;
    case ('GAMEOVER_MAX'):
      infoBar.innerHTML = 'Sorry, out of attempts! Play again?';
      break;
    case ('WIN'):
      infoBar.innerHTML = 'You win!';
      break;
    default:
      break;
  }
};
Game.prototype.toggleStrict = function(game) {
  this.game.settings.strict = true;
};

const resetText = 'Reset';
const startText = 'Let\'s go!';
const newGameBtn = document.querySelector("#newGame");
const toggleStrictBtn = document.querySelector("#toggleStrict");
const indicator = document.querySelector("#indicator");

newGameBtn.addEventListener('click', () => {
  if (!gameOn) {
    currentGame = new Game();
    currentGame.start();
  }
  else {
    currentGame.reset();
  }
  gameOn = !gameOn;
  newGameBtn.innerHTML = gameOn ? resetText : startText;
});
toggleStrictBtn.addEventListener('click', () => {
  strict = !strict;
  indicator.style.backgroundColor = strict ? 'red' : 'white';
});

for (let i = 0; i < grid.length; i++) {
  grid[i].el.addEventListener('click', (e) => currentGame.addUserSelection(e));
}