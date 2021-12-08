class Statistics {
  constructor() {
    this.winsElement = document.querySelector('.stats__container--win .stats__value');
    this.losesElement = document.querySelector('.stats__container--lose .stats__value');
    this.scoreElement = document.querySelector('.stats__container--score .stats__value');

    this.wins = 0;
    this.loses = 0;
    this.score = 0;
  }

  getStatsFromLocalStorage() {
    const win = localStorage.getItem('STATS_WINS');
    const lose = localStorage.getItem('STATS_LOSES');
    const score = localStorage.getItem('STATS_SCORE');

    if (!score && !win && !lose) return;

    this.wins = win;
    this.loses = lose;
    this.score = score;

    this.updateStats();
  }

  updateStats(winner) {
    if (winner === 'w') this.wins++;
    else if (winner === 'b') this.loses++;

    this.score = this.wins - this.loses;

    this.winsElement.textContent = this.wins;
    this.losesElement.textContent = this.loses;
    this.scoreElement.textContent = this.score;

    localStorage.setItem('STATS_WINS', this.wins);
    localStorage.setItem('STATS_LOSES', this.loses);
    localStorage.setItem('STATS_SCORE', this.score);
  }
}
