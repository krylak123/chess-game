class Statistics {
  constructor() {
    this.winsElement = document.querySelector('.stats__container--win .stats__value');
    this.losesElement = document.querySelector('.stats__container--lose .stats__value');
    this.scoreElement = document.querySelector('.stats__container--score .stats__value');

    this.wins = 0;
    this.loses = 0;
    this.score = 0;
  }

  updateStats(winner) {
    if (winner === 'w') this.wins++;
    else this.loses++;

    this.score = this.wins - this.loses;

    this.winsElement.textContent = this.wins;
    this.losesElement.textContent = this.loses;
    this.scoreElement.textContent = this.score;
  }
}
