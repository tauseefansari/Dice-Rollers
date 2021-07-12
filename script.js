'use strict';
// Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const openModalBtns = document.querySelectorAll('.show-modal');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0E1 = document.querySelector('#score--0');
const score0E2 = document.getElementById('score--1');
const current0E = document.getElementById('current--0');
const current1E = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonhold = document.querySelector('.btn--hold');
const winner0 = document.querySelector('#winner--0');
const winner1 = document.querySelector('#winner--1');

let scores, currentScore, activePlayer, playing;

// Initial Condition or New Game Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0E1.textContent = 0;
  score0E2.textContent = 0;
  current0E.textContent = 0;
  current1E.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  winner0.classList.add('hidden');
  winner1.classList.add('hidden');
};

// Calling Initialization
init();

// Switching the Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Adding Roll Dice Functionality
buttonRoll.addEventListener('click', function () {
  if (playing) {
    // Random Dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonhold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`#winner--${activePlayer}`)
        .classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', init);

// Modal Events and Functions
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let index = 0; index < openModalBtns.length; index++)
  openModalBtns[index].addEventListener('click', openModal);

const closeModal = function (e) {
  if (
    e.type === 'click' ||
    (e.key === 'Escape' && !modal.classList.contains('hidden'))
  ) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }
};

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', closeModal);
