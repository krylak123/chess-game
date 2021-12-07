class Timer {
  constructor() {
    this.timerMinutes = document.querySelector('.timeline__timer-minutes');
    this.timerSeconds = document.querySelector('.timeline__timer-seconds');

    this.minutes = 0;
    this.seconds = 0;
    this.intervalIndex = 0;
  }

  startTimer() {
    this.intervalIndex = setInterval(() => {
      this.timerMinutes.textContent = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
      this.timerSeconds.textContent = this.seconds < 10 ? `0${this.seconds}` : this.seconds;

      this.seconds++;

      if (this.seconds >= 60) {
        this.minutes++;
        this.seconds = 0;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalIndex);
  }

  resetTimer() {
    this.timerMinutes.textContent = '00';
    this.timerSeconds.textContent = '00';
    this.minutes = 0;
    this.seconds = 0;
  }
}
