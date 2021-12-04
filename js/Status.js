class Status {
  constructor() {
    this.gameIsOver = false;
    this.gameTurn = 'w';
  }

  changeGameIsOver() {}

  changeGameTurn(turn) {
    if (!(turn === 'w' || turn === 'b')) return;
    this.gameTurn = turn;
  }

  checkWinner() {}
}
