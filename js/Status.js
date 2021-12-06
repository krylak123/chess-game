class Status {
  constructor(modal) {
    this.winnerInput = document.querySelector('.modal__subtitle--winner');

    this.modalGameover = modal;
    this.gameIsOver = false;
    this.gameTurn = 'w';
  }

  changeGameIsOver(value) {
    this.gameIsOver = value;
  }

  changeGameTurn(turn) {
    this.gameTurn = turn;
  }

  checkGameIsOver(positions) {
    const posArray = [];

    for (let pos in positions) {
      posArray.push(positions[pos]);
    }

    if (!posArray.find(pos => pos === 'bK') || !posArray.find(pos => pos === 'wK')) {
      this.handleGameIsOver(this.gameTurn);
    }
  }

  handleGameIsOver(winner) {
    this.changeGameIsOver(true);

    let winnerText = '';

    if (winner === 'w') winnerText = 'Player';
    else winnerText = 'Computer';

    this.winnerInput.textContent = winnerText;
    this.modalGameover.classList.add('modal--open');
  }
}
