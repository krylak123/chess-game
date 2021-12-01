class GameChess {
  constructor(boardID, FEN) {
    this.boardConfig = {
      pieceTheme: 'images/chesspieces/{piece}.png',
      draggable: true,
    };
    this.board = Chessboard(boardID, this.boardConfig);
    this.FENposition = FEN;

    this.modalStart = document.querySelector('.content__modal');

    this.init();
  }

  startGame() {
    this.modalStart.classList.remove('content__modal--open');

    this.board.position(this.FENposition);
  }

  init() {
    document.querySelector('.content__btn').addEventListener('click', this.startGame.bind(this));
  }
}
