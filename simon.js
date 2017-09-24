let currentGame;
let strict = false;
let gameOn = false;

const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const green = document.querySelector("#green");
const yellow = document.querySelector("#yellow");
const grid = [
  {cell: 0, baseColor: '#ff2626', highlightColor: '#fc5555', el: red},
  {cell: 1, baseColor: '#1943ff', highlightColor: '#728cff', el: blue},
  {cell: 2, baseColor: '#2a912b', highlightColor: '#49fc4a', el: green},
  {cell: 3, baseColor: '#ffe419', highlightColor: '#ffed6b', el: yellow}
];

const Game = function() {
  this.game = {
    strict: strict,
    currentPattern: [],
    selectedPattern: [],
    patternLength: 2
  }
}
Game.prototype.incrementPattern = function(){
  this.game.patternLength += 1;
};
Game.prototype.makePattern = function(length) {
  for (let i = 0; i < length; i++) {
    const cellIdx = Math.floor(Math.random() * 4);
    this.game.currentPattern.push(cellIdx);
  }
}
Game.prototype.displayPattern = function(pattern) {
  for (let i = 0; i < this.game.patternLength; i++) {
    const cell = grid[this.game.currentPattern[i]];
    ((i) => setTimeout(() => cell.el.style.backgroundColor = cell.highlightColor, i * 1000))(i);
    ((i) => setTimeout(() => cell.el.style.backgroundColor = cell.baseColor, i * 2000))(i);
  }
}
Game.prototype.takeTurn = function() {
  this.makePattern(this.game.patternLength);
  this.displayPattern(this.game.currentPattern);
}
Game.prototype.addUserSelection = function(e) {
  console.log('Adding selection');
  console.log(e);
  this.game.selectedPattern.push(el);
}
Game.prototype.checkAnswer = function() {
  const winner = this.selectedPattern.filter((color, i) => color === this.currentPattern[i]);
  if (!winner) {
    if (strict) {
      this.takeTurn();
    }
    else {
      this.displayPattern(this.game.currentPattern);
    }
  }
  else {
    this.game.patternLength += 1;
    this.takeTurn();
  }
}
Game.prototype.start = function() {
  console.log('Starting game');
  this.game.started = true;
  this.takeTurn();
}
Game.prototype.reset = function() {
  console.log('Resetting game');
  this.game.started = false;
}
Game.prototype.toggleStrict = function(game) {
  console.log('Toggling strict');
  this.game.settings.strict = true;
}

const resetText = 'Reset';
const startText = 'Let\'s go!';
const newGameBtn = document.querySelector("#newGame");
const toggleStrictBtn = document.querySelector("#toggleStrict");
const indicator = document.querySelector("#indicator");

newGameBtn.addEventListener('click', function() {
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
toggleStrictBtn.addEventListener('click', function() {
  strict = !strict;
  indicator.style.backgroundColor = strict ? 'red' : 'white';
});
for (let i = 0; i < grid.length; i++) {
  grid[i].el.addEventListener('click', (e) => currentGame.addUserSelection(e));
}
