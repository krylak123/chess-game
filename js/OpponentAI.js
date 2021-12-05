class OpponentAI {
  constructor() {
    this.moves = new Moves();

    this.posOfBlackPieces;
  }

  update(positions) {
    const blackPieces = [];

    for (let pos in positions) {
      if (positions[pos].includes('b')) {
        blackPieces.push([pos, positions[pos]]);
      }
    }

    this.posOfBlackPieces = blackPieces;
  }

  getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  generate(currentPositions, board, status) {
    if (status.gameIsOver) return;
    this.update(currentPositions);

    const rndPiece = this.getRandom(this.posOfBlackPieces.length);
    const source = this.posOfBlackPieces[rndPiece][0];
    const piece = this.posOfBlackPieces[rndPiece][1];

    const legalMoves = this.moves.generateMoves(source, piece, currentPositions);
    const rndMove = legalMoves[this.getRandom(legalMoves.length)];
    const rndTime = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;

    setTimeout(() => {
      board.move(`${source}-${rndMove}`);
      board.position(board.fen());
      const newPos = board.position();

      if (!rndMove) {
        return this.generate(currentPositions, board, status);
      }

      if (piece.includes('P') && rndMove.includes('1')) {
        const replace = (newPos[rndMove] = 'bQ');
        board.position(Chessboard.objToFen(newPos, replace));
      }

      status.changeGameTurn('w');
    }, rndTime);
  }
}
