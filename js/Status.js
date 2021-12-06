class Status {
  constructor(modal) {
    this.winnerInput = document.querySelector('.modal__subtitle--winner');

    this.modalGameover = modal;
    this.playerName = '';
    this.gameIsOver = false;
    this.gameTurn = 'w';
  }

  changePlayerName(newName) {
    this.playerName = newName;
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

    if (winner === 'w') {
      winnerText = this.playerName ? this.playerName : 'Player';
      this.winnerInput.style.color = 'green';
    } else {
      winnerText = 'Computer';
      this.winnerInput.style.color = 'red';
    }

    this.winnerInput.textContent = winnerText;
    this.modalGameover.classList.add('modal--open');
  }
}
