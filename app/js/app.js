var Board, Game, c, game,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Board = (function() {
  Board.prototype.squares = [];

  Board.prototype.board_side = 3;

  Board.prototype.square_side = 100;

  Board.prototype.marks = [];

  function Board() {
    this.index = __bind(this.index, this);
    var i, squarePosition, x, y, _i, _j, _k, _ref, _ref1;
    squarePosition = 0;
    for (y = _i = 0, _ref = this.board_side; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      for (x = _j = 0, _ref1 = this.board_side; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        this.squares[this.index(x, y)] = {
          x: x * this.square_side,
          y: y * this.square_side,
          pos: squarePosition
        };
        squarePosition++;
      }
      squarePosition--;
    }
    for (i = _k = 0; _k <= 8; i = ++_k) {
      this.marks[i] = "";
    }
  }

  Board.prototype.index = function(x, y) {
    return (y * this.board_side) + x;
  };

  Board.prototype.in_square = function(x, y) {
    var square, _i, _len, _ref;
    _ref = this.squares;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      square = _ref[_i];
      if (this.collision(x, y, square)) {
        return square;
      }
    }
  };

  Board.prototype.collision = function(x, y, square) {
    switch (false) {
      case !(x < square.x):
        return false;
      case !(x >= square.x + this.square_side):
        return false;
      case !(y < square.y):
        return false;
      case !(y >= square.y + this.square_side):
        return false;
      default:
        return true;
    }
  };

  Board.prototype.firstRow = function() {
    return this.marks.slice(0, 3);
  };

  Board.prototype.secondRow = function() {
    return this.marks.slice(3, 6);
  };

  Board.prototype.thirdRow = function() {
    return this.marks.slice(6, 9);
  };

  Board.prototype.firstCol = function() {
    return this.marks.filter(function(item, i) {
      if (i === 0 || i === 3 || i === 6) {
        return item;
      }
    });
  };

  Board.prototype.secondCol = function() {
    return this.marks.filter(function(item, i) {
      if (i === 1 || i === 4 || i === 7) {
        return item;
      }
    });
  };

  Board.prototype.thirdCol = function() {
    return this.marks.filter(function(item, i) {
      if (i === 2 || i === 5 || i === 8) {
        return item;
      }
    });
  };

  Board.prototype.leftDiag = function() {
    return this.marks.filter(function(item, i) {
      if (i === 0 || i === 4 || i === 8) {
        return item;
      }
    });
  };

  Board.prototype.rightDiag = function() {
    return this.marks.filter(function(item, i) {
      if (i === 2 || i === 4 || i === 6) {
        return item;
      }
    });
  };

  return Board;

})();

Game = (function() {
  Game.prototype.board = new Board();

  Game.prototype.currentPlayer = 1;

  function Game(_at_canvas) {
    this.canvas = _at_canvas;
    this.turn = __bind(this.turn, this);
    this.context = this.canvas.getContext("2d");
    this.drawBoard();
    this.canvas.addEventListener("click", this.turn, false);
  }

  Game.prototype.turn = function(event) {
    var elemLeft, elemTop, square, x, y;
    elemLeft = this.canvas.offsetLeft;
    elemTop = this.canvas.offsetTop;
    x = event.pageX - elemLeft;
    y = event.pageY - elemTop;
    square = this.board.in_square(x, y);
    if (square) {
      if (this.drawAndStore(square)) {
        this.changePlayer();
      }
    }
  };

  Game.prototype.changePlayer = function() {
    if (this.currentPlayer === 1) {
      return this.currentPlayer = 2;
    } else {
      return this.currentPlayer = 1;
    }
  };

  Game.prototype.determineWinner = function() {
    console.log(this.board.firstRow());
    console.log(this.board.secondRow());
    console.log(this.board.thirdRow());
    console.log(this.board.firstCol());
    console.log(this.board.secondCol());
    console.log(this.board.thirdCol());
    console.log(this.board.leftDiag());
    return console.log(this.board.rightDiag());
  };

  Game.prototype.drawAndStore = function(square) {
    if (this.board.marks[square.pos] !== "") {
      return false;
    }
    if (this.currentPlayer === 1) {
      this.drawX(square.x, square.y);
      this.board.marks[square.pos] = "X";
    } else {
      this.drawCircle(square.x, square.y);
      this.board.marks[square.pos] = "O";
    }
    this.determineWinner();
    return true;
  };

  Game.prototype.drawBoard = function() {
    this.context.beginPath();
    this.context.moveTo(100, 0);
    this.context.lineTo(100, 300);
    this.context.moveTo(200, 0);
    this.context.lineTo(200, 300);
    this.context.moveTo(0, 100);
    this.context.lineTo(300, 100);
    this.context.moveTo(0, 200);
    this.context.lineTo(300, 200);
    return this.context.stroke();
  };

  Game.prototype.drawX = function(x, y) {
    var size;
    x = x + 10;
    y = y + 10;
    size = 80;
    this.context.beginPath();
    this.context.strokeStyle = "red";
    this.context.moveTo(x, y);
    this.context.lineTo(x + size, y + size);
    this.context.stroke();
    this.context.beginPath();
    this.context.strokeStyle = "red";
    this.context.moveTo(x + size, y);
    this.context.lineTo(x, y + size);
    this.context.stroke();
  };

  Game.prototype.drawCircle = function(x, y) {
    x += 50;
    y += 50;
    this.context.beginPath();
    this.context.strokeStyle = "red";
    this.context.arc(x, y, 41, 0, 2 * Math.PI);
    this.context.stroke();
  };

  return Game;

})();

window.addEventListener("load", function() {
  console.log("Hello World!");
});

c = document.getElementById("myCanvas");

game = new Game(c);
