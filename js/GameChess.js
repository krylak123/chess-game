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

    this.modalRules = document.querySelector('.modal__rules');
    this.modalStart = document.querySelector('.modal__start');
    this.modalEnd = document.querySelector('.modal__gameover');
    this.winnerInput = document.querySelector('.modal__subtitle--winner');

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
      this.status.changeGameTurn('b');
      this.opponent.generate(newPos, this.board, this.status);
      return 'trash';
    }

    this.status.changeGameTurn('b');
    this.opponent.generate(newPos, this.board, this.status);
  }

  onSnapbackEnd(piece, square, position, orientation) {
    document.querySelector(`[data-square=${square}]`).classList.add('illegalMove');

    setTimeout(() => {
      document.querySelector(`[data-square=${square}]`).classList.remove('illegalMove');
    }, 200);
  }

  gameStart(isFirstGame) {
    if (isFirstGame) {
      this.modalStart.classList.remove('modal--open');
    } else {
      this.modalEnd.classList.remove('modal--open');
    }

    this.board.position(this.FENposition);
  }

  handleRulesModal() {
    this.modalRules.classList.toggle('modal--open');
  }

  init() {
    document
      .querySelector('.modal__btn--rules')
      .addEventListener('click', this.handleRulesModal.bind(this));
    document
      .querySelector('.modal__btn--start')
      .addEventListener('click', this.gameStart.bind(this, true));
    document
      .querySelector('.modal__btn--gameover')
      .addEventListener('click', this.gameStart.bind(this, false));

    window.addEventListener('resize', this.board.resize);
  }
}

//TODO
//zbijanie pionkow na ukos
//check win
//show result
//reset
