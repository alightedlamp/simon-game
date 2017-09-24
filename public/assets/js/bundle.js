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
  grid[i].el.addEventListener('mousedown', (e) => e.target.style.backgroundColor = grid[i].highlightColor);
  grid[i].el.addEventListener('mouseup', (e) => e.target.style.backgroundColor = grid[i].baseColor);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmxldCBjdXJyZW50R2FtZTtcbmxldCBzdHJpY3QgPSBmYWxzZTtcbmxldCBnYW1lT24gPSBmYWxzZTtcbmxldCBtYXhMZW5ndGggPSAyMDtcblxuY29uc3Qgc3RlcERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rpc3BsYXlcIik7XG5jb25zdCBpbmZvQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbmZvXCIpO1xuaW5mb0Jhci5pbm5lckhUTUwgPSAnUHJlc3Mgc3RhcnQgYmVsb3csIGFuZCBwYXkgY2xvc2UgYXR0ZW50aW9uISBFc3BlY2lhbGx5IGFzIHRoZSBnYW1lIHNwZWVkcyB1cC4nO1xuXG5jb25zdCByZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZFwiKTtcbmNvbnN0IGJsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JsdWVcIik7XG5jb25zdCBncmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3JlZW5cIik7XG5jb25zdCB5ZWxsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3llbGxvd1wiKTtcbmNvbnN0IGdyaWQgPSBbXG4gIHtjZWxsOiAwLCBjb2xvcjogJ3JlZCcsIGJhc2VDb2xvcjogJyM4NDEzMTMnLCBoaWdobGlnaHRDb2xvcjogJyNlMDE4MTgnLCBlbDogcmVkfSxcbiAge2NlbGw6IDEsIGNvbG9yOiAnYmx1ZScsIGJhc2VDb2xvcjogJyMxZDFkOGMnLCBoaWdobGlnaHRDb2xvcjogJyMwMDVkZmYnLCBlbDogYmx1ZX0sXG4gIHtjZWxsOiAyLCBjb2xvcjogJ2dyZWVuJywgYmFzZUNvbG9yOiAnIzJhOTEyYicsIGhpZ2hsaWdodENvbG9yOiAnIzIzZGQxNicsIGVsOiBncmVlbn0sXG4gIHtjZWxsOiAzLCBjb2xvcjogJ3llbGxvdycsIGJhc2VDb2xvcjogJyNkM2EyMDInLCBoaWdobGlnaHRDb2xvcjogJyNmZmUxMDAnLCBlbDogeWVsbG93fVxuXTtcblxuY29uc3QgR2FtZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdhbWUgPSB0aGlzLm5ld0dhbWUoKTtcbn07XG5HYW1lLnByb3RvdHlwZS5pbmNyZW1lbnRQYXR0ZXJuID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5nYW1lLnBhdHRlcm5MZW5ndGggKz0gMTtcbn07XG5HYW1lLnByb3RvdHlwZS5hZGRUb1BhdHRlcm4gPSBmdW5jdGlvbihsZW5ndGgpIHtcbiAgY29uc3QgY2VsbElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpO1xuICB0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4ucHVzaChjZWxsSWR4KTtcbn07XG5HYW1lLnByb3RvdHlwZS5kaXNwbGF5UGF0dGVybiA9IGZ1bmN0aW9uKHBhdHRlcm4pIHtcbiAgY29uc29sZS5sb2coYERpc3BsYXlpbmc6ICR7cGF0dGVybn1gKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgdGhpcy5kaXNwbGF5SW5mbygpO1xuICAgIGxldCBpZHggPSAwO1xuXG4gICAgY29uc3QgaGlnaGxpZ2h0ID0gKGNlbGwpID0+IHtcbiAgICAgIGNlbGwuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY2VsbC5oaWdobGlnaHRDb2xvcjtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjZWxsLmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNlbGwuYmFzZUNvbG9yO1xuICAgICAgfSwgNTAwIC8gdGhpcy5nYW1lLnNwZWVkKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbmV4dCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBncmlkW3RoaXMuZ2FtZS5jdXJyZW50UGF0dGVybltpZHhdXTtcbiAgICAgIGhpZ2hsaWdodChjZWxsKTtcbiAgICAgIGlkeCsrO1xuICAgIH07XG4gICAgbmV4dCgpO1xuXG4gICAgY29uc3QgaGlnaGxpZ2h0ZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaWR4ID49IHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5sZW5ndGgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGhpZ2hsaWdodGVyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbmV4dCgpO1xuICAgIH0uYmluZCh0aGlzKSwgMTAwMCAvIHRoaXMuZ2FtZS5zcGVlZCk7XG4gIH0sIDc1MCk7XG59O1xuR2FtZS5wcm90b3R5cGUucmVzZXRUdXJuID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5nYW1lLnNlbGVjdGVkUGF0dGVybiA9IFtdO1xuICB0aGlzLmluY3JlbWVudFBhdHRlcm4oKTtcbn07XG5HYW1lLnByb3RvdHlwZS50YWtlVHVybiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFkZFRvUGF0dGVybih0aGlzLmdhbWUucGF0dGVybkxlbmd0aCk7XG4gIHRoaXMuZGlzcGxheVBhdHRlcm4odGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuKTtcbn07XG5HYW1lLnByb3RvdHlwZS5hZGRVc2VyU2VsZWN0aW9uID0gZnVuY3Rpb24oZSkge1xuICB0aGlzLmdhbWUuc2VsZWN0ZWRQYXR0ZXJuLnB1c2goZS50YXJnZXQuaWQpOyAvLyBleDogJ2dyZWVuJ1xuICBpZiAodGhpcy5nYW1lLnNlbGVjdGVkUGF0dGVybi5sZW5ndGggPT09IHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5sZW5ndGgpIHtcbiAgICB0aGlzLmNoZWNrQW5zd2VyKCk7XG4gIH1cbn07XG5HYW1lLnByb3RvdHlwZS5jaGVja0Fuc3dlciA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCB3aW5uZXIgPSB0aGlzLmdhbWUuc2VsZWN0ZWRQYXR0ZXJuLmZpbHRlcigoY29sb3IsIGkpID0+IHtcbiAgICByZXR1cm4gY29sb3IgPT09IGdyaWRbdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuW2ldXS5jb2xvcjtcbiAgfSkubGVuZ3RoID09PSB0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4ubGVuZ3RoO1xuXG4gIGlmICghd2lubmVyICYmIHRoaXMuZ2FtZS5hdHRlbXB0cyAhPT0gMykge1xuICAgIHRoaXMuZGlzcGxheUluZm8oJ01JU1MnKTtcblxuICAgIGlmIChzdHJpY3QpIHtcbiAgICAgIHRoaXMudGFrZVR1cm4oKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmdhbWUuYXR0ZW1wdHMgKz0gMTtcbiAgICAgIHRoaXMucmVzZXRUdXJuKCk7XG4gICAgICB0aGlzLmRpc3BsYXlQYXR0ZXJuKHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybik7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKCF3aW5uZXIgJiYgdGhpcy5nYW1lLmF0dGVtcHRzID09PSAzKSB7XG4gICAgdGhpcy5yZXNldCgpO1xuICB9XG4gIGVsc2UgaWYgKHdpbm5lciAmJiB0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4gPT09IHRoaXMuZ2FtZS5tYXhMZW5ndGgpIHtcbiAgICB0aGlzLmRpc3BsYXlJbmZvKCk7XG4gICAgY29uc29sZS5sb2coJ1lvdSB3aW4hJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5kaXNwbGF5SW5mbygpO1xuICAgIHRoaXMucmVzZXRUdXJuKCk7XG4gICAgdGhpcy50YWtlVHVybigpO1xuICB9XG59O1xuR2FtZS5wcm90b3R5cGUubmV3R2FtZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHN0cmljdDogc3RyaWN0LFxuICAgIGN1cnJlbnRQYXR0ZXJuOiBbXSxcbiAgICBzZWxlY3RlZFBhdHRlcm46IFtdLFxuICAgIG1heExlbmd0aDogbWF4TGVuZ3RoLFxuICAgIHBhdHRlcm5MZW5ndGg6IDEsXG4gICAgYXR0ZW1wdHM6IDAsXG4gICAgc3BlZWQ6IDFcbiAgfVxufTtcbkdhbWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubmV3R2FtZSgpO1xuICB0aGlzLnRha2VUdXJuKCk7XG59O1xuR2FtZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nYW1lID0gdGhpcy5uZXdHYW1lKCk7XG4gIHRoaXMuZGlzcGxheUluZm8oKTtcbn07XG5HYW1lLnByb3RvdHlwZS5kaXNwbGF5SW5mbyA9IGZ1bmN0aW9uKGFjdGlvbikge1xuICBjb25zdCBzdGVwcyA9IHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5sZW5ndGg7XG4gIHN0ZXBEaXNwbGF5LnZhbHVlID0gYWN0aW9uID09PSAnTUlTUycgPyAnISEnIDogc3RlcHM7XG59O1xuXG5jb25zdCByZXNldFRleHQgPSAnUmVzZXQnO1xuY29uc3Qgc3RhcnRUZXh0ID0gJ1N0YXJ0ISc7XG5jb25zdCBuZXdHYW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdHYW1lXCIpO1xuY29uc3QgdG9nZ2xlU3RyaWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2dnbGVTdHJpY3RcIik7XG5jb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2luZGljYXRvclwiKTtcblxubmV3R2FtZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKCFnYW1lT24pIHtcbiAgICBjdXJyZW50R2FtZSA9IG5ldyBHYW1lKCk7XG4gICAgY3VycmVudEdhbWUuc3RhcnQoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBjdXJyZW50R2FtZS5yZXNldCgpO1xuICB9XG4gIGdhbWVPbiA9ICFnYW1lT247XG4gIG5ld0dhbWVCdG4uaW5uZXJIVE1MID0gZ2FtZU9uID8gcmVzZXRUZXh0IDogc3RhcnRUZXh0O1xufSk7XG50b2dnbGVTdHJpY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHN0cmljdCA9ICFzdHJpY3Q7XG4gIGluZGljYXRvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzdHJpY3QgPyAncmVkJyA6ICd3aGl0ZSc7XG59KTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkLmxlbmd0aDsgaSsrKSB7XG4gIGdyaWRbaV0uZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gY3VycmVudEdhbWUuYWRkVXNlclNlbGVjdGlvbihlKSk7XG4gIGdyaWRbaV0uZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGdyaWRbaV0uaGlnaGxpZ2h0Q29sb3IpO1xuICBncmlkW2ldLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4gZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZ3JpZFtpXS5iYXNlQ29sb3IpO1xufSJdfQ==
