class Status {
  constructor(modal) {
    this.winnerInput = document.querySelector('.modal__subtitle--winner');
    this.panelElement = document.querySelector('.timeline__list');

    this.statistics = new Statistics();

    this.modalGameover = modal;
    this.panel = [];
    this.playerName = '';
    this.gameIsOver = false;
    this.gameTurn = 'w';
  }

  updatePanel(source, target, color) {
    const newTrack = {
      source,
      target,
      color,
    };
    this.panel.push(newTrack);

    this.panelElement.textContent = '';

    const liContainer = document.createDocumentFragment();

    this.panel.forEach(({ source, target, color }, index) => {
      const liElement = document.createElement('li');
      liElement.classList.add('timeline__list-item');
      if (color === 'w') {
        liElement.classList.add('timeline__list-item--white');
      } else {
        liElement.classList.add('timeline__list-item--black');
      }
      liElement.textContent = `${index + 1}. ${source} - ${target}`;
      liContainer.appendChild(liElement);
    });

    this.panelElement.appendChild(liContainer);
    this.panelElement.scrollTop = this.panelElement.scrollHeight;
  }

  resetPanel() {
    this.panelElement.textContent = '';
    this.panel = [];
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

  checkGameIsOver(positions, timer) {
    const posArray = [];

    for (let pos in positions) {
      posArray.push(positions[pos]);
    }

    if (!posArray.find(pos => pos === 'bK') || !posArray.find(pos => pos === 'wK')) {
      this.handleGameIsOver(this.gameTurn, timer);
    }
  }

  handleGameIsOver(winner, timer) {
    this.changeGameIsOver(true);
    timer.stopTimer();

    this.statistics.updateStats(this.gameTurn);

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
