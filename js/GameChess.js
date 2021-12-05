class GameChess {
  constructor(boardID, FEN) {
    this.status = new Status();
    this.moves = new Moves();
    this.opponent = new OpponentAI();

    this.boardConfig = {
      pieceTheme: './images/chesspieces/{piece}.png',
      draggable: true,
      onDragStart: this.onDragStart.bind(this),
      onDrop: this.onDrop.bind(this),
      onSnapbackEnd: this.onSnapbackEnd.bind(this),
    };
    this.board = Chessboard(boardID, this.boardConfig);
    this.FENposition = FEN;

    this.modalStart = document.querySelector('.content__modal');

    this.init();
  }

  onDragStart(source, piece, position, orientation) {
    if (this.status.gameIsOver) return false;
    else if (piece.search(/^b/) !== -1 || this.status.gameTurn !== 'w') return false;

    const legalMoves = this.moves.generateMoves(source, piece, position);

    legalMoves.forEach(move => {
      document.querySelector(`[data-square=${move}]`).classList.add('legalMove');
    });
  }

  onDrop(source, target, piece, newPos, oldPos, orientation) {
    const legalMoves = this.moves.generateMoves(source, piece, oldPos);

    legalMoves.forEach(move => {
      document.querySelector(`[data-square=${move}]`).classList.remove('legalMove');
    });

    if (source === target) return;
    if (!legalMoves.find(move => move === target)) return 'snapback';
    if (piece.includes('P') && target.includes('8')) {
      const replace = (newPos[target] = 'wQ');
      this.board.position(Chessboard.objToFen(newPos, replace));
      return 'trash';
    }

    this.status.checkIsWinner(newPos);
    this.status.changeGameTurn('b');
    this.opponent.generate(newPos, this.board, this.status);
  }

  onSnapbackEnd(piece, square, position, orientation) {
    document.querySelector(`[data-square=${square}]`).classList.add('illegalMove');

    setTimeout(() => {
      document.querySelector(`[data-square=${square}]`).classList.remove('illegalMove');
    }, 200);
  }

  gameStart() {
    this.modalStart.classList.remove('content__modal--open');

    this.board.position(this.FENposition);
  }

  init() {
    document.querySelector('.content__btn').addEventListener('click', this.gameStart.bind(this));
  }
}

//TODO
//zbijanie pionkow na ukos
//check win
//show result
//reset
