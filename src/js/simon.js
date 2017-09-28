/* jshint esversion: 6 */

let currentGame;
let strict = false;
let gameOn = false;
let maxLength = 20;

const stepDisplay = document.querySelector("#display");

const soundsURL = '/assets/audio';

const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const green = document.querySelector("#green");
const yellow = document.querySelector("#yellow");
const grid = [
  {
    cell: 0,
    color: 'red',
    baseColor: '#841313',
    highlightColor: '#e01818',
    el: red,
    sound: `${soundsURL}/simon1.mp3`
  },
  {
    cell: 1,
    color: 'blue',
    baseColor: '#1d1d8c',
    highlightColor: '#005dff',
    el: blue,
    sound: `${soundsURL}/simon2.mp3`
  },
  {
    cell: 2,
    color: 'green',
    baseColor: '#2a912b',
    highlightColor: '#23dd16',
    el: green,
    sound: `${soundsURL}/simon3.mp3`
  },
  {
    cell: 3,
    color: 'yellow',
    baseColor: '#d3a202',
    highlightColor: '#ffe100',
    el: yellow,
    sound: `${soundsURL}/simon4.mp3`
  }
];

const Game = function() {
  this.game = this.newGame();
};
Game.prototype.incrementPattern = function(){
  this.game.patternLength += 1;
};
Game.prototype.addToPattern = function(length) {
  const cellIdx = Math.floor(Math.random() * 4);
  this.game.currentPattern.push(cellIdx);
};
Game.prototype.displayPattern = function(pattern) {
  setTimeout(() => {
    this.displayInfo();
    let idx = 0;

    const highlight = (cell) => {
      const audio = new Audio(cell.sound);
      audio.play();

      cell.el.style.backgroundColor = cell.highlightColor;
      setTimeout(() => {
        cell.el.style.backgroundColor = cell.baseColor;
      }, 500 / this.game.speed);
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
    }.bind(this), 1000 / this.game.speed);
  }, 750);
};
Game.prototype.resetTurn = function(){
  this.game.selectedPattern = [];
  this.incrementPattern();
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
  const winner = this.game.selectedPattern.every((color, i) => color === grid[this.game.currentPattern[i]].color);

  if (!winner && this.game.attempts !== 3) {
    this.displayInfo('MISS');

    if (strict) {
      this.takeTurn();
    }
    else {
      this.game.attempts += 1;
      this.resetTurn();
      this.displayPattern(this.game.currentPattern);
    }
  }
  else if (!winner && this.game.attempts === 3) {
    this.reset();
  }
  else if (winner && this.game.currentPattern === this.game.maxLength) {
    this.displayInfo();
    console.log('You win!');
  }
  else {
    this.displayInfo();
    this.resetTurn();
    this.takeTurn();
  }
};
Game.prototype.newGame = function() {
  return {
    strict: strict,
    currentPattern: [],
    selectedPattern: [],
    maxLength: maxLength,
    patternLength: 1,
    attempts: 0,
    speed: 1
  };
};
Game.prototype.start = function() {
  this.newGame();
  this.takeTurn();
};
Game.prototype.reset = function() {
  this.game = this.newGame();
  this.displayInfo();
};
Game.prototype.displayInfo = function(action) {
  const steps = this.game.currentPattern.length;
  stepDisplay.value = action === 'MISS' ? '!!' : steps;
};

const resetText = 'Reset';
const startText = 'Start!';
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
  grid[i].el.addEventListener('mousedown', (e) => {
    e.target.style.backgroundColor = grid[i].highlightColor
    const audio = new Audio(grid[i].sound);
    audio.play();
  });
  grid[i].el.addEventListener('mouseup', (e) => e.target.style.backgroundColor = grid[i].baseColor);
}
