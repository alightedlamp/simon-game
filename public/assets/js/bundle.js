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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmpzaGludCBlc3ZlcnNpb246IDYgKi9cblxubGV0IGN1cnJlbnRHYW1lO1xubGV0IHN0cmljdCA9IGZhbHNlO1xubGV0IGdhbWVPbiA9IGZhbHNlO1xubGV0IG1heExlbmd0aCA9IDIwO1xuXG5jb25zdCBpbmZvQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbmZvXCIpO1xuaW5mb0Jhci5pbm5lckhUTUwgPSAnUHJlc3Mgc3RhcnQgYmVsb3csIGFuZCBwYXkgY2xvc2UgYXR0ZW50aW9uISBFc3BlY2lhbGx5IGFzIHRoZSBnYW1lIHNwZWVkcyB1cC4nO1xuXG5jb25zdCByZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZFwiKTtcbmNvbnN0IGJsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JsdWVcIik7XG5jb25zdCBncmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3JlZW5cIik7XG5jb25zdCB5ZWxsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3llbGxvd1wiKTtcbmNvbnN0IGdyaWQgPSBbXG4gIHtjZWxsOiAwLCBjb2xvcjogJ3JlZCcsIGJhc2VDb2xvcjogJyNmZjI2MjYnLCBoaWdobGlnaHRDb2xvcjogJyNmYzU1NTUnLCBlbDogcmVkfSxcbiAge2NlbGw6IDEsIGNvbG9yOiAnYmx1ZScsIGJhc2VDb2xvcjogJyMxOTQzZmYnLCBoaWdobGlnaHRDb2xvcjogJyM3MjhjZmYnLCBlbDogYmx1ZX0sXG4gIHtjZWxsOiAyLCBjb2xvcjogJ2dyZWVuJywgYmFzZUNvbG9yOiAnIzJhOTEyYicsIGhpZ2hsaWdodENvbG9yOiAnIzQ5ZmM0YScsIGVsOiBncmVlbn0sXG4gIHtjZWxsOiAzLCBjb2xvcjogJ3llbGxvdycsIGJhc2VDb2xvcjogJyNmZmU0MTknLCBoaWdobGlnaHRDb2xvcjogJyNmZmVkNmInLCBlbDogeWVsbG93fVxuXTtcblxuY29uc3QgR2FtZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdhbWUgPSB7XG4gICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgY3VycmVudFBhdHRlcm46IFtdLFxuICAgIHNlbGVjdGVkUGF0dGVybjogW10sXG4gICAgbWF4TGVuZ3RoOiBtYXhMZW5ndGgsXG4gICAgcGF0dGVybkxlbmd0aDogMSxcbiAgICBhdHRlbXB0czogMCxcbiAgICBzcGVlZDogMVxuICB9O1xufTtcbkdhbWUucHJvdG90eXBlLmluY3JlbWVudFBhdHRlcm4gPSBmdW5jdGlvbigpe1xuICB0aGlzLmdhbWUucGF0dGVybkxlbmd0aCArPSAxO1xufTtcbkdhbWUucHJvdG90eXBlLmFkZFRvUGF0dGVybiA9IGZ1bmN0aW9uKGxlbmd0aCkge1xuICBjb25zdCBjZWxsSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCk7XG4gIHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5wdXNoKGNlbGxJZHgpO1xufTtcbkdhbWUucHJvdG90eXBlLmRpc3BsYXlQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybikge1xuICBjb25zb2xlLmxvZyhgRGlzcGxheWluZzogJHtwYXR0ZXJufWApO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsZXQgaWR4ID0gMDtcblxuICAgIGNvbnN0IGhpZ2hsaWdodCA9IChjZWxsKSA9PiB7XG4gICAgICBjZWxsLmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNlbGwuaGlnaGxpZ2h0Q29sb3I7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2VsbC5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjZWxsLmJhc2VDb2xvcjtcbiAgICAgIH0sIDEwMDAgLyB0aGlzLmdhbWUuc3BlZWQpO1xuICAgIH07XG5cbiAgICBjb25zdCBuZXh0ID0gKCkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGdyaWRbdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuW2lkeF1dO1xuICAgICAgaGlnaGxpZ2h0KGNlbGwpO1xuICAgICAgaWR4Kys7XG4gICAgfTtcbiAgICBuZXh0KCk7XG5cbiAgICBjb25zdCBoaWdobGlnaHRlciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpZHggPj0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaGlnaGxpZ2h0ZXIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuZXh0KCk7XG4gICAgfS5iaW5kKHRoaXMpLCAxNTAwIC8gdGhpcy5nYW1lLnNwZWVkKTtcbiAgfSwgMTAwMCk7XG59O1xuR2FtZS5wcm90b3R5cGUucmVzZXRUdXJuID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5nYW1lLnNlbGVjdGVkUGF0dGVybiA9IFtdO1xuICB0aGlzLmdhbWUucGF0dGVybkxlbmd0aCArPSAxO1xufTtcbkdhbWUucHJvdG90eXBlLnRha2VUdXJuID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYWRkVG9QYXR0ZXJuKHRoaXMuZ2FtZS5wYXR0ZXJuTGVuZ3RoKTtcbiAgdGhpcy5kaXNwbGF5UGF0dGVybih0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4pO1xufTtcbkdhbWUucHJvdG90eXBlLmFkZFVzZXJTZWxlY3Rpb24gPSBmdW5jdGlvbihlKSB7XG4gIHRoaXMuZ2FtZS5zZWxlY3RlZFBhdHRlcm4ucHVzaChlLnRhcmdldC5pZCk7IC8vIGV4OiAnZ3JlZW4nXG4gIGlmICh0aGlzLmdhbWUuc2VsZWN0ZWRQYXR0ZXJuLmxlbmd0aCA9PT0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aCkge1xuICAgIHRoaXMuY2hlY2tBbnN3ZXIoKTtcbiAgfVxufTtcbkdhbWUucHJvdG90eXBlLmNoZWNrQW5zd2VyID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHdpbm5lciA9IHRoaXMuZ2FtZS5zZWxlY3RlZFBhdHRlcm4uZmlsdGVyKChjb2xvciwgaSkgPT4ge1xuICAgIHJldHVybiBjb2xvciA9PT0gZ3JpZFt0aGlzLmdhbWUuY3VycmVudFBhdHRlcm5baV1dLmNvbG9yO1xuICB9KS5sZW5ndGggPT09IHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5sZW5ndGg7XG5cbiAgaWYgKCF3aW5uZXIgJiYgdGhpcy5nYW1lLmF0dGVtcHRzICE9PSAzKSB7XG4gICAgaWYgKHN0cmljdCkge1xuICAgICAgdGhpcy50YWtlVHVybigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheUluZm8oJ1dST05HX1NUUklDVCcpO1xuICAgICAgdGhpcy5nYW1lLmF0dGVtcHRzICs9IDE7XG4gICAgICB0aGlzLnJlc2V0VHVybigpO1xuICAgICAgdGhpcy5kaXNwbGF5UGF0dGVybih0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4pO1xuICAgIH1cbiAgfVxuICBlbHNlIGlmICghd2lubmVyICYmIHRoaXMuZ2FtZS5hdHRlbXB0cyA9PT0gMykge1xuICAgIHRoaXMuZGlzcGxheUluZm8oJ0dBTUVPVkVSX01BWCcpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuICBlbHNlIGlmICh3aW5uZXIgJiYgdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuID09PSB0aGlzLmdhbWUubWF4TGVuZ3RoKSB7XG4gICAgdGhpcy5kaXNwbGF5SW5mbygnV0lOJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5kaXNwbGF5SW5mbygnTkVXX1BBVFRFUk4nKTtcbiAgICB0aGlzLnJlc2V0VHVybigpO1xuICAgIHRoaXMudGFrZVR1cm4oKTtcbiAgfVxufTtcbkdhbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGlzcGxheUluZm8oJ1NUQVJUJyk7XG4gIHRoaXMuZ2FtZS5zdGFydGVkID0gdHJ1ZTtcbiAgdGhpcy50YWtlVHVybigpO1xufTtcbkdhbWUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGlzcGxheUluZm8oJ1JFU0VUJyk7XG4gIHRoaXMuZ2FtZS5zdGFydGVkID0gZmFsc2U7XG59O1xuR2FtZS5wcm90b3R5cGUuY2xlYXJJbmZvID0gZnVuY3Rpb24oKSB7XG4gIGluZm9CYXIuaW5uZXJIVE1MID0gJyc7XG59O1xuR2FtZS5wcm90b3R5cGUuZGlzcGxheUluZm8gPSBmdW5jdGlvbihhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlICgnSU5JVCcpOlxuICAgICAgaW5mb0Jhci5pbm5lckhUTUwgPSAnUHJlc3Mgc3RhcnQgYmVsb3csIGFuZCBwYXkgY2xvc2UgYXR0ZW50aW9uISBFc3BlY2lhbGx5IGFzIHRoZSBnYW1lIHNwZWVkcyB1cC4nO1xuICAgIGNhc2UgKCdTVEFSVCcpOlxuICAgICAgaW5mb0Jhci5pbm5lckhUTUwgPSAnU3RhcnRpbmcgZ2FtZSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICgnUkVTRVQnKTpcbiAgICAgIGluZm9CYXIuaW5uZXJIVE1MID0gJ1Jlc3R0aW5nIGdhbWUnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAoJ05FV19QQVRURVJOJyk6XG4gICAgICBpbmZvQmFyLmlubmVySFRNTCA9ICdHb29kIGpvYiEgTWFraW5nIGEgbmV3IHBhdHRlcm4uJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgKCdXUk9OR19TVFJJQ1QnKTpcbiAgICAgIGluZm9CYXIuaW5uZXJIVE1MID0gJ1dyb25nISBEaXNwbGF5aW5nIHBhdHRlcm4gYWdhaW4uJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgKCdHQU1FT1ZFUl9NQVgnKTpcbiAgICAgIGluZm9CYXIuaW5uZXJIVE1MID0gJ1NvcnJ5LCBvdXQgb2YgYXR0ZW1wdHMhIFBsYXkgYWdhaW4/JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgKCdXSU4nKTpcbiAgICAgIGluZm9CYXIuaW5uZXJIVE1MID0gJ1lvdSB3aW4hJztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufTtcbkdhbWUucHJvdG90eXBlLnRvZ2dsZVN0cmljdCA9IGZ1bmN0aW9uKGdhbWUpIHtcbiAgdGhpcy5nYW1lLnNldHRpbmdzLnN0cmljdCA9IHRydWU7XG59O1xuXG5jb25zdCByZXNldFRleHQgPSAnUmVzZXQnO1xuY29uc3Qgc3RhcnRUZXh0ID0gJ0xldFxcJ3MgZ28hJztcbmNvbnN0IG5ld0dhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld0dhbWVcIik7XG5jb25zdCB0b2dnbGVTdHJpY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZ2dsZVN0cmljdFwiKTtcbmNvbnN0IGluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5kaWNhdG9yXCIpO1xuXG5uZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoIWdhbWVPbikge1xuICAgIGN1cnJlbnRHYW1lID0gbmV3IEdhbWUoKTtcbiAgICBjdXJyZW50R2FtZS5zdGFydCgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGN1cnJlbnRHYW1lLnJlc2V0KCk7XG4gIH1cbiAgZ2FtZU9uID0gIWdhbWVPbjtcbiAgbmV3R2FtZUJ0bi5pbm5lckhUTUwgPSBnYW1lT24gPyByZXNldFRleHQgOiBzdGFydFRleHQ7XG59KTtcbnRvZ2dsZVN0cmljdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RyaWN0ID0gIXN0cmljdDtcbiAgaW5kaWNhdG9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHN0cmljdCA/ICdyZWQnIDogJ3doaXRlJztcbn0pO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IGdyaWQubGVuZ3RoOyBpKyspIHtcbiAgZ3JpZFtpXS5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBjdXJyZW50R2FtZS5hZGRVc2VyU2VsZWN0aW9uKGUpKTtcbn0iXX0=
