'use strict';

// Selecting elements

const btnDraw = document.querySelector('.drawcard');
const btnNewGame = document.querySelector('.newgame');
const drawCard = document.querySelector('.randomcard');
const showResults = document.querySelector('.results');
const player0Score = document.querySelector('.score--0');
const player1Score = document.querySelector('.score--1');
const btnPlaceBet = document.querySelector('.placebet');
const playerTotalCash = document.getElementById('totalcash');
const bets = document.querySelector('.bets');
const dealerTotalCash = document.getElementById('dealercash');

// Functions

const dealerRoll = [Math.floor(Math.random() * 11) + 1, Math.floor(Math.random() * 11) + 1];
let dealerScore = 0;

// for (let i = 0; i < dealerRoll.length; i++) {
//   const dealerDraw = function () {
//     if (dealerRoll[0]) player1Score.textContent = dealerScore; // Only show the first roll by the dealer
//     return (dealerScore += dealerRoll[i]);
//   };
//   dealerDraw();
// }

function dealerDraw(num1, num2) {
  player1Score.textContent = num1;
  console.log('Dealer first card: ' + num1);
  dealerScore = num1 + num2;
  console.log('Dealer cards: ' + num1, num2);
  return dealerScore;
}

// Scores and money

let currentScore = 0;
let playerCash = 500;
let dealerCash = 0;
let playerBet = 0;

// Game state

let noBets = false;
let gameActive = false;

// Random card pick

btnDraw.addEventListener('click', function () {
  if (gameActive === true) {
    const randomCard = Math.floor(Math.random() * 11) + 1;
    drawCard.classList.remove('hidden');
    drawCard.textContent = randomCard;
    currentScore += randomCard;
    player0Score.textContent = currentScore;
    console.log('Player draws a ' + randomCard);
    if (currentScore === 21) {
      showResults.classList.remove('hidden');
      showResults.textContent = 'You rolled a 21 and won the game!';
      playerBet *= 1.5;
      playerCash += playerBet;
      playerTotalCash.textContent = playerCash;
      console.log(playerCash);
    } else if (currentScore > 21) {
      gameActive = false;
      showResults.classList.remove('hidden');
      showResults.textContent = 'You lose the game!';
      dealerCash = playerBet;
      playerBet = 0;
      dealerTotalCash.textContent = dealerCash;
      console.log(dealerCash, playerBet);
    }
  }
});

btnNewGame.addEventListener('click', function () {
  console.log(btnNewGame.textContent);
});

// Place bet

btnPlaceBet.addEventListener('click', function () {
  if (noBets !== true) {
    if (playerCash <= 0) {
      noBets = true;
      console.log('Cash = ' + playerCash);
    } else {
      gameActive = true;
      playerBet = Number(prompt('Place your bet'));
      if (playerBet > 500 || playerBet > playerCash) {
        console.log("You don't have enough money");
      } else {
        playerCash -= playerBet;
        bets.classList.remove('hidden');
        bets.textContent = playerBet;
        playerTotalCash.textContent = playerCash;
        noBets = true;
        console.log('Remaining cash: ' + playerCash);
        console.log('Player bets: ' + playerBet);
        dealerDraw(dealerRoll[0], dealerRoll[1]);
        console.log('Dealer draws a ' + dealerScore);
      }
    }
  }
});
