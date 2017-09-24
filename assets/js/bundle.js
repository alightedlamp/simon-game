/* jshint esversion: 6 */

let currentGame;
let strict = false;
let gameOn = false;
let maxLength = 20;

const stepDisplay = document.querySelector("#display");
const infoBar = document.querySelector("#info");
infoBar.innerHTML = 'Press start below, and pay close attention! Especially as the game speeds up.';

const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const green = document.querySelector("#green");
const yellow = document.querySelector("#yellow");
const grid = [
  {cell: 0, color: 'red', baseColor: '#841313', highlightColor: '#e01818', el: red},
  {cell: 1, color: 'blue', baseColor: '#1d1d8c', highlightColor: '#005dff', el: blue},
  {cell: 2, color: 'green', baseColor: '#2a912b', highlightColor: '#23dd16', el: green},
  {cell: 3, color: 'yellow', baseColor: '#d3a202', highlightColor: '#ffe100', el: yellow}
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
  console.log(`Displaying: ${pattern}`);
  setTimeout(() => {
    this.displayInfo();
    let idx = 0;

    const highlight = (cell) => {
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
  const winner = this.game.selectedPattern.filter((color, i) => {
    return color === grid[this.game.currentPattern[i]].color;
  }).length === this.game.currentPattern.length;

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
  }
};
Game.prototype.start = function() {
  this.newGame();
  this.takeTurn();
};
Game.prototype.reset = function() {
  this.game = {
    strict: strict,
    currentPattern: [],
    selectedPattern: [],
    maxLength: maxLength,
    patternLength: 1,
    attempts: 0,
    speed: 1
  }
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
  grid[i].el.addEventListener('mousedown', (e) => e.target.style.backgroundColor = grid[i].highlightColor);
  grid[i].el.addEventListener('mouseup', (e) => e.target.style.backgroundColor = grid[i].baseColor);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoganNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5sZXQgY3VycmVudEdhbWU7XG5sZXQgc3RyaWN0ID0gZmFsc2U7XG5sZXQgZ2FtZU9uID0gZmFsc2U7XG5sZXQgbWF4TGVuZ3RoID0gMjA7XG5cbmNvbnN0IHN0ZXBEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkaXNwbGF5XCIpO1xuY29uc3QgaW5mb0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5mb1wiKTtcbmluZm9CYXIuaW5uZXJIVE1MID0gJ1ByZXNzIHN0YXJ0IGJlbG93LCBhbmQgcGF5IGNsb3NlIGF0dGVudGlvbiEgRXNwZWNpYWxseSBhcyB0aGUgZ2FtZSBzcGVlZHMgdXAuJztcblxuY29uc3QgcmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWRcIik7XG5jb25zdCBibHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNibHVlXCIpO1xuY29uc3QgZ3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2dyZWVuXCIpO1xuY29uc3QgeWVsbG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN5ZWxsb3dcIik7XG5jb25zdCBncmlkID0gW1xuICB7Y2VsbDogMCwgY29sb3I6ICdyZWQnLCBiYXNlQ29sb3I6ICcjODQxMzEzJywgaGlnaGxpZ2h0Q29sb3I6ICcjZTAxODE4JywgZWw6IHJlZH0sXG4gIHtjZWxsOiAxLCBjb2xvcjogJ2JsdWUnLCBiYXNlQ29sb3I6ICcjMWQxZDhjJywgaGlnaGxpZ2h0Q29sb3I6ICcjMDA1ZGZmJywgZWw6IGJsdWV9LFxuICB7Y2VsbDogMiwgY29sb3I6ICdncmVlbicsIGJhc2VDb2xvcjogJyMyYTkxMmInLCBoaWdobGlnaHRDb2xvcjogJyMyM2RkMTYnLCBlbDogZ3JlZW59LFxuICB7Y2VsbDogMywgY29sb3I6ICd5ZWxsb3cnLCBiYXNlQ29sb3I6ICcjZDNhMjAyJywgaGlnaGxpZ2h0Q29sb3I6ICcjZmZlMTAwJywgZWw6IHllbGxvd31cbl07XG5cbmNvbnN0IEdhbWUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nYW1lID0gdGhpcy5uZXdHYW1lKCk7XG59O1xuR2FtZS5wcm90b3R5cGUuaW5jcmVtZW50UGF0dGVybiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuZ2FtZS5wYXR0ZXJuTGVuZ3RoICs9IDE7XG59O1xuR2FtZS5wcm90b3R5cGUuYWRkVG9QYXR0ZXJuID0gZnVuY3Rpb24obGVuZ3RoKSB7XG4gIGNvbnN0IGNlbGxJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KTtcbiAgdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLnB1c2goY2VsbElkeCk7XG59O1xuR2FtZS5wcm90b3R5cGUuZGlzcGxheVBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuKSB7XG4gIGNvbnNvbGUubG9nKGBEaXNwbGF5aW5nOiAke3BhdHRlcm59YCk7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRoaXMuZGlzcGxheUluZm8oKTtcbiAgICBsZXQgaWR4ID0gMDtcblxuICAgIGNvbnN0IGhpZ2hsaWdodCA9IChjZWxsKSA9PiB7XG4gICAgICBjZWxsLmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNlbGwuaGlnaGxpZ2h0Q29sb3I7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2VsbC5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjZWxsLmJhc2VDb2xvcjtcbiAgICAgIH0sIDUwMCAvIHRoaXMuZ2FtZS5zcGVlZCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG5leHQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZ3JpZFt0aGlzLmdhbWUuY3VycmVudFBhdHRlcm5baWR4XV07XG4gICAgICBoaWdobGlnaHQoY2VsbCk7XG4gICAgICBpZHgrKztcbiAgICB9O1xuICAgIG5leHQoKTtcblxuICAgIGNvbnN0IGhpZ2hsaWdodGVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlkeCA+PSB0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4ubGVuZ3RoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChoaWdobGlnaHRlcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG5leHQoKTtcbiAgICB9LmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLmdhbWUuc3BlZWQpO1xuICB9LCA3NTApO1xufTtcbkdhbWUucHJvdG90eXBlLnJlc2V0VHVybiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuZ2FtZS5zZWxlY3RlZFBhdHRlcm4gPSBbXTtcbiAgdGhpcy5pbmNyZW1lbnRQYXR0ZXJuKCk7XG59O1xuR2FtZS5wcm90b3R5cGUudGFrZVR1cm4gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hZGRUb1BhdHRlcm4odGhpcy5nYW1lLnBhdHRlcm5MZW5ndGgpO1xuICB0aGlzLmRpc3BsYXlQYXR0ZXJuKHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybik7XG59O1xuR2FtZS5wcm90b3R5cGUuYWRkVXNlclNlbGVjdGlvbiA9IGZ1bmN0aW9uKGUpIHtcbiAgdGhpcy5nYW1lLnNlbGVjdGVkUGF0dGVybi5wdXNoKGUudGFyZ2V0LmlkKTsgLy8gZXg6ICdncmVlbidcbiAgaWYgKHRoaXMuZ2FtZS5zZWxlY3RlZFBhdHRlcm4ubGVuZ3RoID09PSB0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4ubGVuZ3RoKSB7XG4gICAgdGhpcy5jaGVja0Fuc3dlcigpO1xuICB9XG59O1xuR2FtZS5wcm90b3R5cGUuY2hlY2tBbnN3ZXIgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgd2lubmVyID0gdGhpcy5nYW1lLnNlbGVjdGVkUGF0dGVybi5maWx0ZXIoKGNvbG9yLCBpKSA9PiB7XG4gICAgcmV0dXJuIGNvbG9yID09PSBncmlkW3RoaXMuZ2FtZS5jdXJyZW50UGF0dGVybltpXV0uY29sb3I7XG4gIH0pLmxlbmd0aCA9PT0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aDtcblxuICBpZiAoIXdpbm5lciAmJiB0aGlzLmdhbWUuYXR0ZW1wdHMgIT09IDMpIHtcbiAgICB0aGlzLmRpc3BsYXlJbmZvKCdNSVNTJyk7XG5cbiAgICBpZiAoc3RyaWN0KSB7XG4gICAgICB0aGlzLnRha2VUdXJuKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5nYW1lLmF0dGVtcHRzICs9IDE7XG4gICAgICB0aGlzLnJlc2V0VHVybigpO1xuICAgICAgdGhpcy5kaXNwbGF5UGF0dGVybih0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4pO1xuICAgIH1cbiAgfVxuICBlbHNlIGlmICghd2lubmVyICYmIHRoaXMuZ2FtZS5hdHRlbXB0cyA9PT0gMykge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuICBlbHNlIGlmICh3aW5uZXIgJiYgdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuID09PSB0aGlzLmdhbWUubWF4TGVuZ3RoKSB7XG4gICAgdGhpcy5kaXNwbGF5SW5mbygpO1xuICAgIGNvbnNvbGUubG9nKCdZb3Ugd2luIScpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMuZGlzcGxheUluZm8oKTtcbiAgICB0aGlzLnJlc2V0VHVybigpO1xuICAgIHRoaXMudGFrZVR1cm4oKTtcbiAgfVxufTtcbkdhbWUucHJvdG90eXBlLm5ld0dhbWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICBjdXJyZW50UGF0dGVybjogW10sXG4gICAgc2VsZWN0ZWRQYXR0ZXJuOiBbXSxcbiAgICBtYXhMZW5ndGg6IG1heExlbmd0aCxcbiAgICBwYXR0ZXJuTGVuZ3RoOiAxLFxuICAgIGF0dGVtcHRzOiAwLFxuICAgIHNwZWVkOiAxXG4gIH1cbn07XG5HYW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5ld0dhbWUoKTtcbiAgdGhpcy50YWtlVHVybigpO1xufTtcbkdhbWUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2FtZSA9IHtcbiAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICBjdXJyZW50UGF0dGVybjogW10sXG4gICAgc2VsZWN0ZWRQYXR0ZXJuOiBbXSxcbiAgICBtYXhMZW5ndGg6IG1heExlbmd0aCxcbiAgICBwYXR0ZXJuTGVuZ3RoOiAxLFxuICAgIGF0dGVtcHRzOiAwLFxuICAgIHNwZWVkOiAxXG4gIH1cbiAgdGhpcy5kaXNwbGF5SW5mbygpO1xufTtcbkdhbWUucHJvdG90eXBlLmRpc3BsYXlJbmZvID0gZnVuY3Rpb24oYWN0aW9uKSB7XG4gIGNvbnN0IHN0ZXBzID0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aDtcbiAgc3RlcERpc3BsYXkudmFsdWUgPSBhY3Rpb24gPT09ICdNSVNTJyA/ICchIScgOiBzdGVwcztcbn07XG5cbmNvbnN0IHJlc2V0VGV4dCA9ICdSZXNldCc7XG5jb25zdCBzdGFydFRleHQgPSAnU3RhcnQhJztcbmNvbnN0IG5ld0dhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld0dhbWVcIik7XG5jb25zdCB0b2dnbGVTdHJpY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZ2dsZVN0cmljdFwiKTtcbmNvbnN0IGluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5kaWNhdG9yXCIpO1xuXG5uZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoIWdhbWVPbikge1xuICAgIGN1cnJlbnRHYW1lID0gbmV3IEdhbWUoKTtcbiAgICBjdXJyZW50R2FtZS5zdGFydCgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGN1cnJlbnRHYW1lLnJlc2V0KCk7XG4gIH1cbiAgZ2FtZU9uID0gIWdhbWVPbjtcbiAgbmV3R2FtZUJ0bi5pbm5lckhUTUwgPSBnYW1lT24gPyByZXNldFRleHQgOiBzdGFydFRleHQ7XG59KTtcbnRvZ2dsZVN0cmljdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RyaWN0ID0gIXN0cmljdDtcbiAgaW5kaWNhdG9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHN0cmljdCA/ICdyZWQnIDogJ3doaXRlJztcbn0pO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IGdyaWQubGVuZ3RoOyBpKyspIHtcbiAgZ3JpZFtpXS5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBjdXJyZW50R2FtZS5hZGRVc2VyU2VsZWN0aW9uKGUpKTtcbiAgZ3JpZFtpXS5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4gZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZ3JpZFtpXS5oaWdobGlnaHRDb2xvcik7XG4gIGdyaWRbaV0uZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBncmlkW2ldLmJhc2VDb2xvcik7XG59Il19
