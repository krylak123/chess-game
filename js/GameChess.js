class GameChess {
  constructor(boardID, FEN) {
    this.moves = new Moves();

    this.boardConfig = {
      pieceTheme: './images/chesspieces/{piece}.png',
      draggable: true,
      onDragStart: this.onDragStart.bind(this),
      onDrop: this.onDrop.bind(this),
      onSnapbackEnd: this.onSnapbackEnd.bind(this),
    };
    this.board = Chessboard(boardID, this.boardConfig);
    this.FENposition = FEN;

    this.gameOver = false;
    this.turn = 'w';

    this.modalStart = document.querySelector('.content__modal');

    this.init();
  }

  onDragStart(source, piece, position, orientation) {
    if (this.gameOver) return false;
    if (piece.search(/^b/) !== -1) return false;

    const legalMoves = this.moves.generateMoves(source, piece);

    legalMoves.forEach(move => {
      document.querySelector(`[data-square=${move}]`).classList.add('legalMove');
    });
  }

  onDrop(source, target, piece, newPos, oldPos, orientation) {
    const legalMoves = this.moves.generateMoves(source, piece);

    legalMoves.forEach(move => {
      document.querySelector(`[data-square=${move}]`).classList.remove('legalMove');
    });

    if (source === target) return;
    if (!legalMoves.find(move => move === target)) return 'snapback';

    //if legal updateStatus and start opponent AI
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
