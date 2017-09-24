/* jshint esversion: 6 */

let currentGame;
let strict = false;
let gameOn = false;
let maxLength = 20;

const stepDisplay = document.querySelector("#display");

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXG5cbmxldCBjdXJyZW50R2FtZTtcbmxldCBzdHJpY3QgPSBmYWxzZTtcbmxldCBnYW1lT24gPSBmYWxzZTtcbmxldCBtYXhMZW5ndGggPSAyMDtcblxuY29uc3Qgc3RlcERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rpc3BsYXlcIik7XG5cbmNvbnN0IHJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVkXCIpO1xuY29uc3QgYmx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYmx1ZVwiKTtcbmNvbnN0IGdyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncmVlblwiKTtcbmNvbnN0IHllbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjeWVsbG93XCIpO1xuY29uc3QgZ3JpZCA9IFtcbiAge2NlbGw6IDAsIGNvbG9yOiAncmVkJywgYmFzZUNvbG9yOiAnIzg0MTMxMycsIGhpZ2hsaWdodENvbG9yOiAnI2UwMTgxOCcsIGVsOiByZWR9LFxuICB7Y2VsbDogMSwgY29sb3I6ICdibHVlJywgYmFzZUNvbG9yOiAnIzFkMWQ4YycsIGhpZ2hsaWdodENvbG9yOiAnIzAwNWRmZicsIGVsOiBibHVlfSxcbiAge2NlbGw6IDIsIGNvbG9yOiAnZ3JlZW4nLCBiYXNlQ29sb3I6ICcjMmE5MTJiJywgaGlnaGxpZ2h0Q29sb3I6ICcjMjNkZDE2JywgZWw6IGdyZWVufSxcbiAge2NlbGw6IDMsIGNvbG9yOiAneWVsbG93JywgYmFzZUNvbG9yOiAnI2QzYTIwMicsIGhpZ2hsaWdodENvbG9yOiAnI2ZmZTEwMCcsIGVsOiB5ZWxsb3d9XG5dO1xuXG5jb25zdCBHYW1lID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2FtZSA9IHRoaXMubmV3R2FtZSgpO1xufTtcbkdhbWUucHJvdG90eXBlLmluY3JlbWVudFBhdHRlcm4gPSBmdW5jdGlvbigpe1xuICB0aGlzLmdhbWUucGF0dGVybkxlbmd0aCArPSAxO1xufTtcbkdhbWUucHJvdG90eXBlLmFkZFRvUGF0dGVybiA9IGZ1bmN0aW9uKGxlbmd0aCkge1xuICBjb25zdCBjZWxsSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCk7XG4gIHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5wdXNoKGNlbGxJZHgpO1xufTtcbkdhbWUucHJvdG90eXBlLmRpc3BsYXlQYXR0ZXJuID0gZnVuY3Rpb24ocGF0dGVybikge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB0aGlzLmRpc3BsYXlJbmZvKCk7XG4gICAgbGV0IGlkeCA9IDA7XG5cbiAgICBjb25zdCBoaWdobGlnaHQgPSAoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjZWxsLmhpZ2hsaWdodENvbG9yO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNlbGwuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY2VsbC5iYXNlQ29sb3I7XG4gICAgICB9LCA1MDAgLyB0aGlzLmdhbWUuc3BlZWQpO1xuICAgIH07XG5cbiAgICBjb25zdCBuZXh0ID0gKCkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGdyaWRbdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuW2lkeF1dO1xuICAgICAgaGlnaGxpZ2h0KGNlbGwpO1xuICAgICAgaWR4Kys7XG4gICAgfTtcbiAgICBuZXh0KCk7XG5cbiAgICBjb25zdCBoaWdobGlnaHRlciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpZHggPj0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaGlnaGxpZ2h0ZXIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuZXh0KCk7XG4gICAgfS5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5nYW1lLnNwZWVkKTtcbiAgfSwgNzUwKTtcbn07XG5HYW1lLnByb3RvdHlwZS5yZXNldFR1cm4gPSBmdW5jdGlvbigpe1xuICB0aGlzLmdhbWUuc2VsZWN0ZWRQYXR0ZXJuID0gW107XG4gIHRoaXMuaW5jcmVtZW50UGF0dGVybigpO1xufTtcbkdhbWUucHJvdG90eXBlLnRha2VUdXJuID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYWRkVG9QYXR0ZXJuKHRoaXMuZ2FtZS5wYXR0ZXJuTGVuZ3RoKTtcbiAgdGhpcy5kaXNwbGF5UGF0dGVybih0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4pO1xufTtcbkdhbWUucHJvdG90eXBlLmFkZFVzZXJTZWxlY3Rpb24gPSBmdW5jdGlvbihlKSB7XG4gIHRoaXMuZ2FtZS5zZWxlY3RlZFBhdHRlcm4ucHVzaChlLnRhcmdldC5pZCk7IC8vIGV4OiAnZ3JlZW4nXG4gIGlmICh0aGlzLmdhbWUuc2VsZWN0ZWRQYXR0ZXJuLmxlbmd0aCA9PT0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aCkge1xuICAgIHRoaXMuY2hlY2tBbnN3ZXIoKTtcbiAgfVxufTtcbkdhbWUucHJvdG90eXBlLmNoZWNrQW5zd2VyID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHdpbm5lciA9IHRoaXMuZ2FtZS5zZWxlY3RlZFBhdHRlcm4uZmlsdGVyKChjb2xvciwgaSkgPT4ge1xuICAgIHJldHVybiBjb2xvciA9PT0gZ3JpZFt0aGlzLmdhbWUuY3VycmVudFBhdHRlcm5baV1dLmNvbG9yO1xuICB9KS5sZW5ndGggPT09IHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5sZW5ndGg7XG5cbiAgaWYgKCF3aW5uZXIgJiYgdGhpcy5nYW1lLmF0dGVtcHRzICE9PSAzKSB7XG4gICAgdGhpcy5kaXNwbGF5SW5mbygnTUlTUycpO1xuXG4gICAgaWYgKHN0cmljdCkge1xuICAgICAgdGhpcy50YWtlVHVybigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZ2FtZS5hdHRlbXB0cyArPSAxO1xuICAgICAgdGhpcy5yZXNldFR1cm4oKTtcbiAgICAgIHRoaXMuZGlzcGxheVBhdHRlcm4odGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuKTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoIXdpbm5lciAmJiB0aGlzLmdhbWUuYXR0ZW1wdHMgPT09IDMpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gIH1cbiAgZWxzZSBpZiAod2lubmVyICYmIHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybiA9PT0gdGhpcy5nYW1lLm1heExlbmd0aCkge1xuICAgIHRoaXMuZGlzcGxheUluZm8oKTtcbiAgICBjb25zb2xlLmxvZygnWW91IHdpbiEnKTtcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLmRpc3BsYXlJbmZvKCk7XG4gICAgdGhpcy5yZXNldFR1cm4oKTtcbiAgICB0aGlzLnRha2VUdXJuKCk7XG4gIH1cbn07XG5HYW1lLnByb3RvdHlwZS5uZXdHYW1lID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgY3VycmVudFBhdHRlcm46IFtdLFxuICAgIHNlbGVjdGVkUGF0dGVybjogW10sXG4gICAgbWF4TGVuZ3RoOiBtYXhMZW5ndGgsXG4gICAgcGF0dGVybkxlbmd0aDogMSxcbiAgICBhdHRlbXB0czogMCxcbiAgICBzcGVlZDogMVxuICB9XG59O1xuR2FtZS5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5uZXdHYW1lKCk7XG4gIHRoaXMudGFrZVR1cm4oKTtcbn07XG5HYW1lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdhbWUgPSB0aGlzLm5ld0dhbWUoKTtcbiAgdGhpcy5kaXNwbGF5SW5mbygpO1xufTtcbkdhbWUucHJvdG90eXBlLmRpc3BsYXlJbmZvID0gZnVuY3Rpb24oYWN0aW9uKSB7XG4gIGNvbnN0IHN0ZXBzID0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aDtcbiAgc3RlcERpc3BsYXkudmFsdWUgPSBhY3Rpb24gPT09ICdNSVNTJyA/ICchIScgOiBzdGVwcztcbn07XG5cbmNvbnN0IHJlc2V0VGV4dCA9ICdSZXNldCc7XG5jb25zdCBzdGFydFRleHQgPSAnU3RhcnQhJztcbmNvbnN0IG5ld0dhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld0dhbWVcIik7XG5jb25zdCB0b2dnbGVTdHJpY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZ2dsZVN0cmljdFwiKTtcbmNvbnN0IGluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5kaWNhdG9yXCIpO1xuXG5uZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoIWdhbWVPbikge1xuICAgIGN1cnJlbnRHYW1lID0gbmV3IEdhbWUoKTtcbiAgICBjdXJyZW50R2FtZS5zdGFydCgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGN1cnJlbnRHYW1lLnJlc2V0KCk7XG4gIH1cbiAgZ2FtZU9uID0gIWdhbWVPbjtcbiAgbmV3R2FtZUJ0bi5pbm5lckhUTUwgPSBnYW1lT24gPyByZXNldFRleHQgOiBzdGFydFRleHQ7XG59KTtcbnRvZ2dsZVN0cmljdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc3RyaWN0ID0gIXN0cmljdDtcbiAgaW5kaWNhdG9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHN0cmljdCA/ICdyZWQnIDogJ3doaXRlJztcbn0pO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IGdyaWQubGVuZ3RoOyBpKyspIHtcbiAgZ3JpZFtpXS5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBjdXJyZW50R2FtZS5hZGRVc2VyU2VsZWN0aW9uKGUpKTtcbiAgZ3JpZFtpXS5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4gZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZ3JpZFtpXS5oaWdobGlnaHRDb2xvcik7XG4gIGdyaWRbaV0uZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBncmlkW2ldLmJhc2VDb2xvcik7XG59Il19
