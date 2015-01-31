class Board
  squares: []
  board_side: 3
  square_side: 100
  marks: []
  constructor: () ->
    squarePosition = 0
    for y in [0..@board_side]
      for x in [0..@board_side]
        @squares[@index(x, y)] = 
          x: x * @square_side
          y: y * @square_side
          pos: squarePosition
        squarePosition++
      squarePosition--

    for i in [0..8]
      @marks[i] = ""

  index: (x, y) =>
    (y * @board_side) + x

  in_square: (x, y) ->
    for square in @squares
      if @collision(x, y, square)
        return square

  collision: (x, y, square) ->
    switch
      when x < square.x
        false
      when x >= square.x + @square_side
        false
      when y < square.y
        false
      when y >= square.y + @square_side
        false
      else
        true
  firstRow: ->
    @marks[0..2]

  secondRow: ->
    @marks[3..5]

  thirdRow: ->
    @marks[6..8]

  firstCol: ->
    @marks.filter (item, i) -> 
      if i in [0,3,6]
        item

  secondCol: ->
    @marks.filter (item, i) -> 
      if i in [1,4,7]
        item

  thirdCol: ->
    @marks.filter (item, i) -> 
      if i in [2,5,8]
        item

  leftDiag: ->
    @marks.filter (item, i) -> 
      if i in [0,4,8]
        item

  rightDiag: ->
    @marks.filter (item, i) -> 
      if i in [2,4,6]
        item

class Game
  board: new Board()
  currentPlayer: 1

  constructor: (@canvas) ->
    @context = @canvas.getContext("2d")
    @drawBoard()
    @canvas.addEventListener "click", @turn, false

  turn: (event) =>
    elemLeft = @canvas.offsetLeft
    elemTop = @canvas.offsetTop
    x = event.pageX - elemLeft
    y = event.pageY - elemTop
    square = @board.in_square(x,y) 
    if square
      @changePlayer() if @drawAndStore(square)
    return

  changePlayer: ->
    if @currentPlayer == 1
      @currentPlayer = 2
    else
      @currentPlayer = 1

  determineWinner: ->
    console.log @board.firstRow()
    console.log @board.secondRow()
    console.log @board.thirdRow()
    console.log @board.firstCol()
    console.log @board.secondCol()
    console.log @board.thirdCol()
    console.log @board.leftDiag()
    console.log @board.rightDiag()

  drawAndStore: (square) ->
    return false unless @board.marks[square.pos] == ""
    if @currentPlayer == 1
      @drawX(square.x,square.y)
      @board.marks[square.pos] = "X"
    else
      @drawCircle(square.x,square.y)
      @board.marks[square.pos] = "O"
    @determineWinner()
    return true

  drawBoard: ->
    @context.beginPath()
    @context.moveTo 100, 0
    @context.lineTo 100, 300
    @context.moveTo 200, 0
    @context.lineTo 200, 300
    @context.moveTo 0, 100
    @context.lineTo 300, 100
    @context.moveTo 0, 200
    @context.lineTo 300, 200
    @context.stroke()

  drawX: (x, y) ->
    x = x + 10
    y = y + 10
    size = 80
    @context.beginPath()
    @context.strokeStyle = "red"
    @context.moveTo x, y
    @context.lineTo x + size, y + size
    @context.stroke()
    @context.beginPath()
    @context.strokeStyle = "red"
    @context.moveTo x + size, y
    @context.lineTo x, y + size
    @context.stroke()
    return

  drawCircle: (x, y) ->
    x += 50
    y += 50
    @context.beginPath()
    @context.strokeStyle = "red"
    @context.arc x, y, 41, 0, 2 * Math.PI
    @context.stroke()
    return




window.addEventListener "load", ->
  console.log "Hello World!"
  return

c = document.getElementById("myCanvas")
game = new Game(c)
