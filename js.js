'use strict';

// Selecting elements

// const btnDraw = document.querySelector('.drawcard');
const btnNewGame = document.querySelector('.newgame');
const drawCard = document.querySelector('.randomcard');
const showResults = document.querySelector('.results');
const player0Score = document.querySelector('.score--0');
const player1Score = document.querySelector('.score--1');
const btnPlaceBet = document.querySelector('.placebet');
const playerTotalCash = document.getElementById('totalcash');
const bets = document.querySelector('.bets');
const dealerTotalCash = document.getElementById('dealercash');
const btnDeal = document.querySelector('.deal');
const btnHit = document.querySelector('.hit');
const btnStand = document.querySelector('.stand');

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

// function dealerDraw(num1, num2) {
//   player1Score.textContent = num1;
//   console.log('Dealer first card: ' + num1);
//   dealerScore = num1 + num2;
//   console.log('Dealer cards: ' + num1, num2);
//   return dealerScore;
// }

function dealerDraw(num1) {
  num1 = num1[Math.floor(Math.random() * [num1.length])];
  if (num1 === 1) {
    num1 = 11;
    dealerScore += num1;
    return dealerScore;
  } else {
    dealerScore += num1;
    return dealerScore;
  }
}

// Scores and money

let currentScore = 0;
let playerCash = 500;
let dealerCash = 0;
let playerBet = 0;

// Game state

let noBets = false;
let gameActive = false;
let allowHit = false;

// Random card pick

let ace;
let aceChoice;
const jack = 10;
const queen = 10;
const king = 10;
const cardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, jack, queen, king];
const dealCard = cardsArray[Math.floor(Math.random() * [cardsArray.length])];

function playerDraw(num1) {
  num1 = num1[Math.floor(Math.random() * [num1.length])];
  if (num1 === 1 || num1 === 11) {
    let decision = Number(prompt('Pick 1 or 11 for the ace'));
    if (decision === 1) {
      currentScore += decision;
      player0Score.textContent = currentScore;
      // console.log('Player drew a: ' + num1);
      return currentScore;
    } else {
      decision = 11;
      currentScore += decision;
      player0Score.textContent = currentScore;
      // console.log('Player drew a: ' + num1);
      return currentScore;
    }
  } else {
    currentScore += num1;
    player0Score.textContent = currentScore;
    // console.log('Player draws a ' + num1);
    return currentScore;
  }
}

// btnDraw.addEventListener('click', function () {
//   if (gameActive === true) {
//     const randomCard = Math.floor(Math.random() * 11) + 1;
//     drawCard.classList.remove('hidden');
//     drawCard.textContent = randomCard;
//     currentScore += randomCard;
//     player0Score.textContent = currentScore;
//     console.log('Player draws a ' + randomCard);
//     if (currentScore === 21) {
//       showResults.classList.remove('hidden');
//       showResults.textContent = 'You rolled a 21 and won the game!';
//       playerBet *= 1.5;
//       playerCash += playerBet;
//       playerTotalCash.textContent = playerCash;
//       console.log(playerCash);
//     } else if (currentScore > 21) {
//       gameActive = false;
//       showResults.classList.remove('hidden');
//       showResults.textContent = 'You lose the game!';
//       dealerCash = playerBet;
//       playerBet = 0;
//       dealerTotalCash.textContent = dealerCash;
//       console.log(dealerCash, playerBet);
//     }
//   }
// });

btnNewGame.addEventListener('click', function () {
  bets.classList.add('hidden');
  showResults.classList.add('hidden');
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  playerBet = 0;
  currentScore = 0;
  dealerScore = 0;
  noBets = false;
  console.log('You pressed the new game button!');
});

// Place bet

btnPlaceBet.addEventListener('click', function () {
  if (noBets !== true) {
    if (playerCash <= 0) {
      // Can't start a new
      noBets = true;
      showResults.classList.remove('hidden');
      showResults.textContent = "You don't have enough cash to play!";
      console.log('Cash = ' + playerCash);
    } else {
      gameActive = true;
      playerBet = Number(prompt('Place your bet'));
      if (playerBet > 500 || playerBet > playerCash) {
        // console.log("You don't have enough money");
        showResults.classList.remove('hidden');
        showResults.textContent = "You don't have enough money";
        gameActive = false;
      } else if (playerBet === null || playerBet <= 0 || !playerBet) {
        showResults.classList.remove('hidden');
        showResults.textContent = "You didn't place a bet";
        gameActive = false;
      } else {
        showResults.classList.add('hidden');
        playerCash -= playerBet;
        bets.classList.remove('hidden');
        bets.textContent = playerBet;
        playerTotalCash.textContent = playerCash;
        noBets = true;
        console.log('Remaining cash: ' + playerCash);
        console.log('Player bets: ' + playerBet);
        // dealerDraw(dealerRoll[0], dealerRoll[1]);
        dealerDraw(cardsArray);
        player1Score.textContent = dealerScore;
        console.log('Dealer draws a ' + dealerScore);
        playerDraw(cardsArray);
        console.log('Player draws a ' + currentScore);
      }
    }
  }
});

// Deal - round 2

btnDeal.addEventListener('click', function () {
  if (gameActive === true) {
    playerDraw(cardsArray);
    dealerDraw(cardsArray);
    console.log('Player score = ' + currentScore);
    console.log('Dealer score = ' + dealerScore + ' (second roll hidden)');
    gameActive = false;
    allowHit = true;
    if (currentScore === 21) {
      playerCash += playerBet * 1.5;
      playerTotalCash.textContent = playerCash;
      showResults.classList.remove('hidden');
      showResults.textContent = 'You rolled Blackjack and won the game!';
      console.log(playerCash);
    }
  }
});

// Hit

btnHit.addEventListener('click', function () {
  if (allowHit === true) {
    playerDraw(cardsArray);
    player0Score.textContent = currentScore;
    if (currentScore > 21) {
      showResults.classList.remove('hidden');
      showResults.textContent = 'BUST! You lose the game';
      dealerCash = playerBet;
      bets.textContent = 0;
      dealerTotalCash.textContent = playerBet;
      gameActive = false;
      allowHit = false;
    } else if (currentScore === 21) {
      playerCash += playerBet;
      playerTotalCash.textContent = playerCash;
      bets.textContent = 0;
      showResults.classList.remove('hidden');
      showResults.textContent = 'You rolled 21 and won the pot!';
      gameActive = false;
      allowHit = false;
      console.log(playerCash);
    }
  }
});

// Stand

btnStand.addEventListener('click', function () {
  if (allowHit === true) {
    allowHit = false;
    console.log('Player score: ' + currentScore);
    player1Score.textContent = dealerScore;
    if (dealerScore <= 16) {
      dealerDraw(cardsArray);
      player1Score.textContent = dealerScore;
      console.log('Dealer score: ' + dealerScore);
      if (dealerScore > 21) {
        showResults.classList.remove('hidden');
        showResults.textContent = 'You beat the dealer!';
        playerCash += playerBet;
        playerTotalCash.textContent = playerCash;
        bets.textContent = 0;
      } else if (dealerScore < 21 && dealerScore > currentScore) {
        showResults.classList.remove('hidden');
        showResults.textContent = 'The dealer won the round!';
        dealerCash += playerBet;
        dealerTotalCash.textContent = dealerCash;
        bets.textContent = 0;
      } else if (dealerScore < 21 && dealerScore < currentScore) {
        showResults.classList.remove('hidden');
        showResults.textContent = 'You beat the dealer!';
        playerCash += playerBet;
        playerTotalCash.textContent = playerCash;
        bets.textContent = 0;
      } else if (dealerScore === currentScore) {
        showResults.classList.remove('hidden');
        showResults.textContent = 'Tie game. No winner!';
      } else {
        showResults.classList.remove('hidden');
        showResults.textContent = 'The dealer won the round!';
        dealerCash += playerBet;
        dealerTotalCash.textContent = dealerCash;
        bets.textContent = 0;
      }
    } else if (dealerScore > currentScore && !(dealerScore > 21)) {
      showResults.classList.remove('hidden');
      showResults.textContent = 'The dealer won the round!';
      dealerCash += playerBet;
      dealerTotalCash.textContent = dealerCash;
      bets.textContent = 0;
    } else if (dealerScore === currentScore) {
      showResults.classList.remove('hidden');
      showResults.textContent = 'Tie game. No winner!';
    } else {
      showResults.classList.remove('hidden');
      showResults.textContent = 'You beat the dealer!';
      playerCash += playerBet;
      playerTotalCash.textContent = playerCash;
      bets.textContent = 0;
    }
  }
});
