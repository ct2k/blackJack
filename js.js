'use strict';

// Selecting elements

const btnDraw = document.querySelector('.drawcard');
const btnNewGame = document.querySelector('.newgame');
const drawCard = document.querySelector('.randomcard');
const showResults = document.querySelector('.results');
const player0Score = document.querySelector('.score--0');
const player1Score = document.querySelector('.score--1');

// Functions

const dealerRoll = [Math.floor(Math.random() * 11) + 1, Math.floor(Math.random() * 11) + 1];
let dealerScore = 0;

for (let i = 0; i < dealerRoll.length; i++) {
  const dealerDraw = function () {
    if (dealerRoll[0]) player1Score.textContent = dealerScore; // Only show the first roll by the dealer
    return (dealerScore += dealerRoll[i]);
  };
  dealerDraw();
}
console.log('Dealer draws a ' + dealerScore);

// Scores

let currentScore = 0;

// Random card pick

btnDraw.addEventListener('click', function () {
  const randomCard = Math.floor(Math.random() * 11) + 1;
  drawCard.classList.remove('hidden');
  drawCard.textContent = randomCard;
  currentScore += randomCard;
  player0Score.textContent = currentScore;
  console.log('Player draws a ' + randomCard);
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
