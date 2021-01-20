'use strict';

const playerFirstElement = document.querySelector('.player--0');
const playerSecondElement = document.querySelector('.player--1');
const scoreFirstElement = document.getElementById('score--0');
const scoreSecondElement = document.getElementById('score--1');
const currentFirstElement = document.getElementById('current--0');
const currentSecondElement = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const newButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreFirstElement.textContent = 0;
  scoreSecondElement.textContent = 0;
  currentFirstElement.textContent = 0;
  currentSecondElement.textContent = 0;

  diceElement.classList.add('.hidden');
  playerFirstElement.classList.remove('player--winner');
  playerSecondElement.classList.remove('player--winner');
  playerFirstElement.classList.add('player--active');
  playerSecondElement.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerFirstElement.classList.toggle('player--active');
  playerSecondElement.classList.toggle('player--active');
};

rollButton.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove('.hidden');
    diceElement.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('.hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newButton.addEventListener('click', init);
