"use strict";

/* jshint esversion: 6 */

var currentGame = void 0;
var strict = false;
var gameOn = false;
var maxLength = 20;

var soundsURL = '/assets/audio';

var stepDisplay = document.querySelector("#display");

var red = document.querySelector("#red");
var blue = document.querySelector("#blue");
var green = document.querySelector("#green");
var yellow = document.querySelector("#yellow");
var grid = [{
  cell: 0,
  color: 'red',
  baseColor: '#841313',
  highlightColor: '#e01818',
  el: red,
  sound: soundsURL + "/simon1.mp3"
}, {
  cell: 1,
  color: 'blue',
  baseColor: '#1d1d8c',
  highlightColor: '#005dff',
  el: blue,
  sound: soundsURL + "/simon2.mp3"
}, {
  cell: 2,
  color: 'green',
  baseColor: '#2a912b',
  highlightColor: '#23dd16',
  el: green,
  sound: soundsURL + "/simon3.mp3"
}, {
  cell: 3,
  color: 'yellow',
  baseColor: '#d3a202',
  highlightColor: '#ffe100',
  el: yellow,
  sound: soundsURL + "/simon4.mp3"
}];

var Game = function Game() {
  this.game = this.newGame();
};
Game.prototype.incrementPattern = function () {
  this.game.patternLength += 1;
};
Game.prototype.addToPattern = function (length) {
  var cellIdx = Math.floor(Math.random() * 4);
  this.game.currentPattern.push(cellIdx);
};
Game.prototype.displayPattern = function (pattern) {
  var _this = this;

  setTimeout(function () {
    _this.displayInfo();
    var idx = 0;

    var highlight = function highlight(cell) {
      var audio = new Audio(cell.sound);
      audio.play();

      cell.el.style.backgroundColor = cell.highlightColor;
      setTimeout(function () {
        cell.el.style.backgroundColor = cell.baseColor;
      }, 500 / _this.game.speed);
    };

    var next = function next() {
      var cell = grid[_this.game.currentPattern[idx]];
      highlight(cell);
      idx++;
    };
    next();

    var highlighter = setInterval(function () {
      if (idx >= this.game.currentPattern.length) {
        clearTimeout(highlighter);
        return;
      }
      next();
    }.bind(_this), 1000 / _this.game.speed);
  }, 750);
};
Game.prototype.resetTurn = function () {
  this.game.selectedPattern = [];
  this.incrementPattern();
};
Game.prototype.takeTurn = function () {
  this.addToPattern(this.game.patternLength);
  this.displayPattern(this.game.currentPattern);
};
Game.prototype.addUserSelection = function (e) {
  this.game.selectedPattern.push(e.target.id); // ex: 'green'
  if (this.game.selectedPattern.length === this.game.currentPattern.length) {
    this.checkAnswer();
  }
};
Game.prototype.checkAnswer = function () {
  var _this2 = this;

  var winner = this.game.selectedPattern.filter(function (color, i) {
    return color === grid[_this2.game.currentPattern[i]].color;
  }).length === this.game.currentPattern.length;

  if (!winner && this.game.attempts !== 3) {
    this.displayInfo('MISS');

    if (strict) {
      this.takeTurn();
    } else {
      this.game.attempts += 1;
      this.resetTurn();
      this.displayPattern(this.game.currentPattern);
    }
  } else if (!winner && this.game.attempts === 3) {
    this.reset();
  } else if (winner && this.game.currentPattern === this.game.maxLength) {
    this.displayInfo();
    console.log('You win!');
  } else {
    this.displayInfo();
    this.resetTurn();
    this.takeTurn();
  }
};
Game.prototype.newGame = function () {
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
Game.prototype.start = function () {
  this.newGame();
  this.takeTurn();
};
Game.prototype.reset = function () {
  this.game = this.newGame();
  this.displayInfo();
};
Game.prototype.displayInfo = function (action) {
  var steps = this.game.currentPattern.length;
  stepDisplay.value = action === 'MISS' ? '!!' : steps;
};

var resetText = 'Reset';
var startText = 'Start!';
var newGameBtn = document.querySelector("#newGame");
var toggleStrictBtn = document.querySelector("#toggleStrict");
var indicator = document.querySelector("#indicator");

newGameBtn.addEventListener('click', function () {
  if (!gameOn) {
    currentGame = new Game();
    currentGame.start();
  } else {
    currentGame.reset();
  }
  gameOn = !gameOn;
  newGameBtn.innerHTML = gameOn ? resetText : startText;
});
toggleStrictBtn.addEventListener('click', function () {
  strict = !strict;
  indicator.style.backgroundColor = strict ? 'red' : 'white';
});

var _loop = function _loop(i) {
  grid[i].el.addEventListener('click', function (e) {
    currentGame.addUserSelection(e);
    var audio = new Audio(grid[i].sound);
    audio.play();
  });
  grid[i].el.addEventListener('mousedown', function (e) {
    return e.target.style.backgroundColor = grid[i].highlightColor;
  });
  grid[i].el.addEventListener('mouseup', function (e) {
    return e.target.style.backgroundColor = grid[i].baseColor;
  });
};

for (var i = 0; i < grid.length; i++) {
  _loop(i);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGpzaGludCBlc3ZlcnNpb246IDYgKi9cblxudmFyIGN1cnJlbnRHYW1lID0gdm9pZCAwO1xudmFyIHN0cmljdCA9IGZhbHNlO1xudmFyIGdhbWVPbiA9IGZhbHNlO1xudmFyIG1heExlbmd0aCA9IDIwO1xuXG52YXIgc291bmRzVVJMID0gJy9hc3NldHMvYXVkaW8nO1xuXG52YXIgc3RlcERpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rpc3BsYXlcIik7XG5cbnZhciByZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZFwiKTtcbnZhciBibHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNibHVlXCIpO1xudmFyIGdyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNncmVlblwiKTtcbnZhciB5ZWxsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3llbGxvd1wiKTtcbnZhciBncmlkID0gW3tcbiAgY2VsbDogMCxcbiAgY29sb3I6ICdyZWQnLFxuICBiYXNlQ29sb3I6ICcjODQxMzEzJyxcbiAgaGlnaGxpZ2h0Q29sb3I6ICcjZTAxODE4JyxcbiAgZWw6IHJlZCxcbiAgc291bmQ6IHNvdW5kc1VSTCArIFwiL3NpbW9uMS5tcDNcIlxufSwge1xuICBjZWxsOiAxLFxuICBjb2xvcjogJ2JsdWUnLFxuICBiYXNlQ29sb3I6ICcjMWQxZDhjJyxcbiAgaGlnaGxpZ2h0Q29sb3I6ICcjMDA1ZGZmJyxcbiAgZWw6IGJsdWUsXG4gIHNvdW5kOiBzb3VuZHNVUkwgKyBcIi9zaW1vbjIubXAzXCJcbn0sIHtcbiAgY2VsbDogMixcbiAgY29sb3I6ICdncmVlbicsXG4gIGJhc2VDb2xvcjogJyMyYTkxMmInLFxuICBoaWdobGlnaHRDb2xvcjogJyMyM2RkMTYnLFxuICBlbDogZ3JlZW4sXG4gIHNvdW5kOiBzb3VuZHNVUkwgKyBcIi9zaW1vbjMubXAzXCJcbn0sIHtcbiAgY2VsbDogMyxcbiAgY29sb3I6ICd5ZWxsb3cnLFxuICBiYXNlQ29sb3I6ICcjZDNhMjAyJyxcbiAgaGlnaGxpZ2h0Q29sb3I6ICcjZmZlMTAwJyxcbiAgZWw6IHllbGxvdyxcbiAgc291bmQ6IHNvdW5kc1VSTCArIFwiL3NpbW9uNC5tcDNcIlxufV07XG5cbnZhciBHYW1lID0gZnVuY3Rpb24gR2FtZSgpIHtcbiAgdGhpcy5nYW1lID0gdGhpcy5uZXdHYW1lKCk7XG59O1xuR2FtZS5wcm90b3R5cGUuaW5jcmVtZW50UGF0dGVybiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5nYW1lLnBhdHRlcm5MZW5ndGggKz0gMTtcbn07XG5HYW1lLnByb3RvdHlwZS5hZGRUb1BhdHRlcm4gPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gIHZhciBjZWxsSWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCk7XG4gIHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5wdXNoKGNlbGxJZHgpO1xufTtcbkdhbWUucHJvdG90eXBlLmRpc3BsYXlQYXR0ZXJuID0gZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBfdGhpcy5kaXNwbGF5SW5mbygpO1xuICAgIHZhciBpZHggPSAwO1xuXG4gICAgdmFyIGhpZ2hsaWdodCA9IGZ1bmN0aW9uIGhpZ2hsaWdodChjZWxsKSB7XG4gICAgICB2YXIgYXVkaW8gPSBuZXcgQXVkaW8oY2VsbC5zb3VuZCk7XG4gICAgICBhdWRpby5wbGF5KCk7XG5cbiAgICAgIGNlbGwuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY2VsbC5oaWdobGlnaHRDb2xvcjtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjZWxsLmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNlbGwuYmFzZUNvbG9yO1xuICAgICAgfSwgNTAwIC8gX3RoaXMuZ2FtZS5zcGVlZCk7XG4gICAgfTtcblxuICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHZhciBjZWxsID0gZ3JpZFtfdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuW2lkeF1dO1xuICAgICAgaGlnaGxpZ2h0KGNlbGwpO1xuICAgICAgaWR4Kys7XG4gICAgfTtcbiAgICBuZXh0KCk7XG5cbiAgICB2YXIgaGlnaGxpZ2h0ZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaWR4ID49IHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5sZW5ndGgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGhpZ2hsaWdodGVyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbmV4dCgpO1xuICAgIH0uYmluZChfdGhpcyksIDEwMDAgLyBfdGhpcy5nYW1lLnNwZWVkKTtcbiAgfSwgNzUwKTtcbn07XG5HYW1lLnByb3RvdHlwZS5yZXNldFR1cm4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZ2FtZS5zZWxlY3RlZFBhdHRlcm4gPSBbXTtcbiAgdGhpcy5pbmNyZW1lbnRQYXR0ZXJuKCk7XG59O1xuR2FtZS5wcm90b3R5cGUudGFrZVR1cm4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWRkVG9QYXR0ZXJuKHRoaXMuZ2FtZS5wYXR0ZXJuTGVuZ3RoKTtcbiAgdGhpcy5kaXNwbGF5UGF0dGVybih0aGlzLmdhbWUuY3VycmVudFBhdHRlcm4pO1xufTtcbkdhbWUucHJvdG90eXBlLmFkZFVzZXJTZWxlY3Rpb24gPSBmdW5jdGlvbiAoZSkge1xuICB0aGlzLmdhbWUuc2VsZWN0ZWRQYXR0ZXJuLnB1c2goZS50YXJnZXQuaWQpOyAvLyBleDogJ2dyZWVuJ1xuICBpZiAodGhpcy5nYW1lLnNlbGVjdGVkUGF0dGVybi5sZW5ndGggPT09IHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybi5sZW5ndGgpIHtcbiAgICB0aGlzLmNoZWNrQW5zd2VyKCk7XG4gIH1cbn07XG5HYW1lLnByb3RvdHlwZS5jaGVja0Fuc3dlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgdmFyIHdpbm5lciA9IHRoaXMuZ2FtZS5zZWxlY3RlZFBhdHRlcm4uZmlsdGVyKGZ1bmN0aW9uIChjb2xvciwgaSkge1xuICAgIHJldHVybiBjb2xvciA9PT0gZ3JpZFtfdGhpczIuZ2FtZS5jdXJyZW50UGF0dGVybltpXV0uY29sb3I7XG4gIH0pLmxlbmd0aCA9PT0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aDtcblxuICBpZiAoIXdpbm5lciAmJiB0aGlzLmdhbWUuYXR0ZW1wdHMgIT09IDMpIHtcbiAgICB0aGlzLmRpc3BsYXlJbmZvKCdNSVNTJyk7XG5cbiAgICBpZiAoc3RyaWN0KSB7XG4gICAgICB0aGlzLnRha2VUdXJuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2FtZS5hdHRlbXB0cyArPSAxO1xuICAgICAgdGhpcy5yZXNldFR1cm4oKTtcbiAgICAgIHRoaXMuZGlzcGxheVBhdHRlcm4odGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXdpbm5lciAmJiB0aGlzLmdhbWUuYXR0ZW1wdHMgPT09IDMpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gIH0gZWxzZSBpZiAod2lubmVyICYmIHRoaXMuZ2FtZS5jdXJyZW50UGF0dGVybiA9PT0gdGhpcy5nYW1lLm1heExlbmd0aCkge1xuICAgIHRoaXMuZGlzcGxheUluZm8oKTtcbiAgICBjb25zb2xlLmxvZygnWW91IHdpbiEnKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRpc3BsYXlJbmZvKCk7XG4gICAgdGhpcy5yZXNldFR1cm4oKTtcbiAgICB0aGlzLnRha2VUdXJuKCk7XG4gIH1cbn07XG5HYW1lLnByb3RvdHlwZS5uZXdHYW1lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHN0cmljdDogc3RyaWN0LFxuICAgIGN1cnJlbnRQYXR0ZXJuOiBbXSxcbiAgICBzZWxlY3RlZFBhdHRlcm46IFtdLFxuICAgIG1heExlbmd0aDogbWF4TGVuZ3RoLFxuICAgIHBhdHRlcm5MZW5ndGg6IDEsXG4gICAgYXR0ZW1wdHM6IDAsXG4gICAgc3BlZWQ6IDFcbiAgfTtcbn07XG5HYW1lLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5uZXdHYW1lKCk7XG4gIHRoaXMudGFrZVR1cm4oKTtcbn07XG5HYW1lLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5nYW1lID0gdGhpcy5uZXdHYW1lKCk7XG4gIHRoaXMuZGlzcGxheUluZm8oKTtcbn07XG5HYW1lLnByb3RvdHlwZS5kaXNwbGF5SW5mbyA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgdmFyIHN0ZXBzID0gdGhpcy5nYW1lLmN1cnJlbnRQYXR0ZXJuLmxlbmd0aDtcbiAgc3RlcERpc3BsYXkudmFsdWUgPSBhY3Rpb24gPT09ICdNSVNTJyA/ICchIScgOiBzdGVwcztcbn07XG5cbnZhciByZXNldFRleHQgPSAnUmVzZXQnO1xudmFyIHN0YXJ0VGV4dCA9ICdTdGFydCEnO1xudmFyIG5ld0dhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld0dhbWVcIik7XG52YXIgdG9nZ2xlU3RyaWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2dnbGVTdHJpY3RcIik7XG52YXIgaW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbmRpY2F0b3JcIik7XG5cbm5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIGlmICghZ2FtZU9uKSB7XG4gICAgY3VycmVudEdhbWUgPSBuZXcgR2FtZSgpO1xuICAgIGN1cnJlbnRHYW1lLnN0YXJ0KCk7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudEdhbWUucmVzZXQoKTtcbiAgfVxuICBnYW1lT24gPSAhZ2FtZU9uO1xuICBuZXdHYW1lQnRuLmlubmVySFRNTCA9IGdhbWVPbiA/IHJlc2V0VGV4dCA6IHN0YXJ0VGV4dDtcbn0pO1xudG9nZ2xlU3RyaWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICBzdHJpY3QgPSAhc3RyaWN0O1xuICBpbmRpY2F0b3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc3RyaWN0ID8gJ3JlZCcgOiAnd2hpdGUnO1xufSk7XG5cbnZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGkpIHtcbiAgZ3JpZFtpXS5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgY3VycmVudEdhbWUuYWRkVXNlclNlbGVjdGlvbihlKTtcbiAgICB2YXIgYXVkaW8gPSBuZXcgQXVkaW8oZ3JpZFtpXS5zb3VuZCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICB9KTtcbiAgZ3JpZFtpXS5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBncmlkW2ldLmhpZ2hsaWdodENvbG9yO1xuICB9KTtcbiAgZ3JpZFtpXS5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICByZXR1cm4gZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZ3JpZFtpXS5iYXNlQ29sb3I7XG4gIH0pO1xufTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBncmlkLmxlbmd0aDsgaSsrKSB7XG4gIF9sb29wKGkpO1xufSJdfQ==
