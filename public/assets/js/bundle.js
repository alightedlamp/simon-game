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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qanNoaW50IGVzdmVyc2lvbjogNiAqL1xuXG5sZXQgY3VycmVudEdhbWU7XG5sZXQgc3RyaWN0ID0gZmFsc2U7XG5sZXQgZ2FtZU9uID0gZmFsc2U7XG5sZXQgbWF4TGVuZ3RoID0gMjA7XG5cbmNvbnN0IGluZm9CYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2luZm9cIik7XG5pbmZvQmFyLmlubmVySFRNTCA9ICdQcmVzcyBzdGFydCBiZWxvdywgYW5kIHBheSBjbG9zZSBhdHRlbnRpb24hIEVzcGVjaWFsbHkgYXMgdGhlIGdhbWUgc3BlZWRzIHVwLic7XG5cbmNvbnN0IHJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVkXCIpO1xuY29uc3QgYmx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmx1ZVwiKTtcbmNvbnN0IGdyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncmVlblwiKTtcbmNvbnN0IHllbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjeWVsbG93XCIpO1xuY29uc3QgZ3JpZCA9IFtcbiAge2NlbGw6IDAsIGNvbG9yOiAncmVkJywgYmFzZUNvbG9yOiAnI2ZmMjYyNicsIGhpZ2hsaWdodENvbG9yOiAnI2ZjNTU1NScsIGVsOiByZWR9LFxuICB7Y2VsbDogMSwgY29sb3I6ICdibHVlJywgYmFzZUNvbG9yOiAnIzE5NDNmZicsIGhpZ2hsaWdodENvbG9yOiAnIzcyOGNmZicsIGVsOiBibHVlfSxcbiAge2NlbGw6IDIsIGNvbG9yOiAnZ3JlZW4nLCBiYXNlQ29sb3I6ICcjMmE5MTJiJywgaGlnaGxpZ2h0Q29sb3I6ICcjNDlmYzRhJywgZWw6IGdyZWVufSxcbiAge2NlbGw6IDMsIGNvbG9yOiAneWVsbG93JywgYmFzZUNvbG9yOiAnI2ZmZTQxOScsIGhpZ2hsaWdodENvbG9yOiAnI2ZmZWQ2YicsIGVsOiB5ZWxsb3d9XG5dO1xuXG5jb25zdCBHYW1lID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2FtZSA9IHtcbiAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICBjdXJyZW50UGF0dGVybjogW10sXG4gICAgc2VsZWN0ZWRQYXR0ZXJuOiBbXSxcbiAgICBtYXhMZW5ndGg6IG1heExlbmd0aCxcbiAgICBwYXR0ZXJuTGVuZ3RoOiAxLFxuICAgIGF0dGVtcHRzOiAwLFxuICAgIHNwZWVkOiAxXG4gIH07XG59O1xuR2FtZS5wcm90b3R5cGUuaW5jcmVtZW50UGF0dGVybiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuZ2FtZS5wYXR0ZXJuTGVuZ3RoICs9IDE7XG59O1xuR2FtZS5wcm90b3R5cGUuYWRkVG9QYXR0ZXJuID0gZnVuY3Rpb24obGVuZ3RoKSB7XG4gIGNvbnN0IGNlbGxJZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KTtcbiAgdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLnB1c2goY2VsbElkeCk7XG59O1xuR2FtZS5wcm90b3R5cGUuZGlzcGxheVBhdHRlcm4gPSBmdW5jdGlvbihwYXR0ZXJuKSB7XG4gIGNvbnNvbGUubG9nKGBEaXNwbGF5aW5nOiAke3BhdHRlcm59YCk7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGxldCBpZHggPSAwO1xuXG4gICAgY29uc3QgaGlnaGxpZ2h0ID0gKGNlbGwpID0+IHtcbiAgICAgIGNlbGwuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY2VsbC5oaWdobGlnaHRDb2xvcjtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjZWxsLmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNlbGwuYmFzZUNvbG9yO1xuICAgICAgfSwgMTAwMCAvIHRoaXMuZ2FtZS5zcGVlZCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG5leHQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZ3JpZFt0aGlzLmdhbWUuY3VycmVudFBhdHRlcm5baWR4XV07XG4gICAgICBoaWdobGlnaHQoY2VsbCk7XG4gICAgICBpZHgrKztcbiAgICB9O1xuICAgIG5leHQoKTtcblxuICAgIGNvbnN0IGhpZ2hsaWdodGVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlkeCA+PSB0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4ubGVuZ3RoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChoaWdobGlnaHRlcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG5leHQoKTtcbiAgICB9LmJpbmQodGhpcyksIDE1MDAgLyB0aGlzLmdhbWUuc3BlZWQpO1xuICB9LCAxMDAwKTtcbn07XG5HYW1lLnByb3RvdHlwZS5yZXNldFR1cm4gPSBmdW5jdGlvbigpe1xuICB0aGlzLmdhbWUuc2VsZWN0ZWRQYXR0ZXJuID0gW107XG4gIHRoaXMuZ2FtZS5wYXR0ZXJuTGVuZ3RoICs9IDE7XG59O1xuR2FtZS5wcm90b3R5cGUudGFrZVR1cm4gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hZGRUb1BhdHRlcm4odGhpcy5nYW1lLnBhdHRlcm5MZW5ndGgpO1xuICB0aGlzLmRpc3BsYXlQYXR0ZXJuKHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybik7XG59O1xuR2FtZS5wcm90b3R5cGUuYWRkVXNlclNlbGVjdGlvbiA9IGZ1bmN0aW9uKGUpIHtcbiAgdGhpcy5nYW1lLnNlbGVjdGVkUGF0dGVybi5wdXNoKGUudGFyZ2V0LmlkKTsgLy8gZXg6ICdncmVlbidcbiAgaWYgKHRoaXMuZ2FtZS5zZWxlY3RlZFBhdHRlcm4ubGVuZ3RoID09PSB0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4ubGVuZ3RoKSB7XG4gICAgdGhpcy5jaGVja0Fuc3dlcigpO1xuICB9XG59O1xuR2FtZS5wcm90b3R5cGUuY2hlY2tBbnN3ZXIgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgd2lubmVyID0gdGhpcy5nYW1lLnNlbGVjdGVkUGF0dGVybi5maWx0ZXIoKGNvbG9yLCBpKSA9PiB7XG4gICAgcmV0dXJuIGNvbG9yID09PSBncmlkW3RoaXMuZ2FtZS5jdXJyZW50UGF0dGVybltpXV0uY29sb3I7XG4gIH0pLmxlbmd0aCA9PT0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aDtcblxuICBpZiAoIXdpbm5lciAmJiB0aGlzLmdhbWUuYXR0ZW1wdHMgIT09IDMpIHtcbiAgICBpZiAoc3RyaWN0KSB7XG4gICAgICB0aGlzLnRha2VUdXJuKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5SW5mbygnV1JPTkdfU1RSSUNUJyk7XG4gICAgICB0aGlzLmdhbWUuYXR0ZW1wdHMgKz0gMTtcbiAgICAgIHRoaXMucmVzZXRUdXJuKCk7XG4gICAgICB0aGlzLmRpc3BsYXlQYXR0ZXJuKHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybik7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKCF3aW5uZXIgJiYgdGhpcy5nYW1lLmF0dGVtcHRzID09PSAzKSB7XG4gICAgdGhpcy5kaXNwbGF5SW5mbygnR0FNRU9WRVJfTUFYJyk7XG4gICAgdGhpcy5yZXNldCgpO1xuICB9XG4gIGVsc2UgaWYgKHdpbm5lciAmJiB0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4gPT09IHRoaXMuZ2FtZS5tYXhMZW5ndGgpIHtcbiAgICB0aGlzLmRpc3BsYXlJbmZvKCdXSU4nKTtcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLmRpc3BsYXlJbmZvKCdORVdfUEFUVEVSTicpO1xuICAgIHRoaXMucmVzZXRUdXJuKCk7XG4gICAgdGhpcy50YWtlVHVybigpO1xuICB9XG59O1xuR2FtZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kaXNwbGF5SW5mbygnU1RBUlQnKTtcbiAgdGhpcy5nYW1lLnN0YXJ0ZWQgPSB0cnVlO1xuICB0aGlzLnRha2VUdXJuKCk7XG59O1xuR2FtZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kaXNwbGF5SW5mbygnUkVTRVQnKTtcbiAgdGhpcy5nYW1lLnN0YXJ0ZWQgPSBmYWxzZTtcbn07XG5HYW1lLnByb3RvdHlwZS5jbGVhckluZm8gPSBmdW5jdGlvbigpIHtcbiAgaW5mb0Jhci5pbm5lckhUTUwgPSAnJztcbn07XG5HYW1lLnByb3RvdHlwZS5kaXNwbGF5SW5mbyA9IGZ1bmN0aW9uKGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbikge1xuICAgIGNhc2UgKCdJTklUJyk6XG4gICAgICBpbmZvQmFyLmlubmVySFRNTCA9ICdQcmVzcyBzdGFydCBiZWxvdywgYW5kIHBheSBjbG9zZSBhdHRlbnRpb24hIEVzcGVjaWFsbHkgYXMgdGhlIGdhbWUgc3BlZWRzIHVwLic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICgnU1RBUlQnKTpcbiAgICAgIGluZm9CYXIuaW5uZXJIVE1MID0gJ1N0YXJ0aW5nIGdhbWUnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAoJ1JFU0VUJyk6XG4gICAgICBpbmZvQmFyLmlubmVySFRNTCA9ICdSZXN0dGluZyBnYW1lJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgKCdORVdfUEFUVEVSTicpOlxuICAgICAgaW5mb0Jhci5pbm5lckhUTUwgPSAnR29vZCBqb2IhIE1ha2luZyBhIG5ldyBwYXR0ZXJuLic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICgnV1JPTkdfU1RSSUNUJyk6XG4gICAgICBpbmZvQmFyLmlubmVySFRNTCA9ICdXcm9uZyEgRGlzcGxheWluZyBwYXR0ZXJuIGFnYWluLic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICgnR0FNRU9WRVJfTUFYJyk6XG4gICAgICBpbmZvQmFyLmlubmVySFRNTCA9ICdTb3JyeSwgb3V0IG9mIGF0dGVtcHRzISBQbGF5IGFnYWluPyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICgnV0lOJyk6XG4gICAgICBpbmZvQmFyLmlubmVySFRNTCA9ICdZb3Ugd2luISc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn07XG5HYW1lLnByb3RvdHlwZS50b2dnbGVTdHJpY3QgPSBmdW5jdGlvbihnYW1lKSB7XG4gIHRoaXMuZ2FtZS5zZXR0aW5ncy5zdHJpY3QgPSB0cnVlO1xufTtcblxuY29uc3QgcmVzZXRUZXh0ID0gJ1Jlc2V0JztcbmNvbnN0IHN0YXJ0VGV4dCA9ICdMZXRcXCdzIGdvISc7XG5jb25zdCBuZXdHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdHYW1lXCIpO1xuY29uc3QgdG9nZ2xlU3RyaWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2dnbGVTdHJpY3RcIik7XG5jb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2luZGljYXRvclwiKTtcblxubmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKCFnYW1lT24pIHtcbiAgICBjdXJyZW50R2FtZSA9IG5ldyBHYW1lKCk7XG4gICAgY3VycmVudEdhbWUuc3RhcnQoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBjdXJyZW50R2FtZS5yZXNldCgpO1xuICB9XG4gIGdhbWVPbiA9ICFnYW1lT247XG4gIG5ld0dhbWVCdG4uaW5uZXJIVE1MID0gZ2FtZU9uID8gcmVzZXRUZXh0IDogc3RhcnRUZXh0O1xufSk7XG50b2dnbGVTdHJpY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHN0cmljdCA9ICFzdHJpY3Q7XG4gIGluZGljYXRvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzdHJpY3QgPyAncmVkJyA6ICd3aGl0ZSc7XG59KTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkLmxlbmd0aDsgaSsrKSB7XG4gIGdyaWRbaV0uZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gY3VycmVudEdhbWUuYWRkVXNlclNlbGVjdGlvbihlKSk7XG59Il19
