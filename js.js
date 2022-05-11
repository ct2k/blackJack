'use strict';

// Selecting elements

const btnDraw = document.querySelector('.drawcard');
const btnNewGame = document.querySelector('.newgame');
const drawCard = document.querySelector('.randomcard');
const showResults = document.querySelector('.results');
const player0Score = document.querySelector('.score--0');

// Scores

let currentScore = 0;

// Random card pick

btnDraw.addEventListener('click', function () {
  const randomCard = Math.floor(Math.random() * 21) + 1;
  drawCard.classList.remove('hidden');
  drawCard.textContent = randomCard;
  currentScore += randomCard;
  player0Score.textContent = currentScore;
  console.log(randomCard);
  if (currentScore === 21) {
    showResults.classList.remove('hidden');
    showResults.textContent = 'You rolled a 21 and won the game!';
  } else if (currentScore > 21) {
    showResults.classList.remove('hidden');
    showResults.textContent = 'You lose the game!';
  }
});

btnNewGame.addEventListener('click', function () {
  console.log(btnNewGame.textContent);
});
