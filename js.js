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
const player0FirstCard = document.querySelector('.first--0');
const player0SecondCard = document.querySelector('.second--0');
const player1FirstCard = document.querySelector('.first--1');
const player1SecondCard = document.querySelector('.second--1');

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

function dealerDraw(num1, num2) {
  num1 = num1[Math.floor(Math.random() * [num1.length])];
  if (num1 === 1) {
    num1 = 11;
    dealerScore += num1;
    num2.src = `images/PNG-cards-1.3/ace_of_${randomizeSuit(cardSuit)}.png`;
    return dealerScore;
  } else if (num1 === 11) {
    num1 = 10;
    dealerScore += num1;
    num2.src = `images/PNG-cards-1.3/jack_of_${randomizeSuit(cardSuit)}2.png`;
    return dealerScore;
  } else if (num1 === 12) {
    num1 = 10;
    dealerScore += num1;
    num2.src = `images/PNG-cards-1.3/queen_of_${randomizeSuit(cardSuit)}2.png`;
    return dealerScore;
  } else if (num1 === 13) {
    num1 = 10;
    dealerScore += num1;
    num2.src = `images/PNG-cards-1.3/king_of_${randomizeSuit(cardSuit)}2.png`;
    return dealerScore;
  } else {
    dealerScore += num1;
    num2.src = `images/PNG-cards-1.3/${num1}_of_${randomizeSuit(cardSuit)}.png`;
    return dealerScore;
  }
}

const randomizeSuit = num2 => num2[Math.floor(Math.random() * [num2.length])];

const playerWins = function () {
  playerCash += playerBet;
  playerTotalCash.textContent = playerCash;
  bets.textContent = 0;
  showResults.classList.remove('hidden');
  showResults.textContent = 'You beat the dealer and won the pot!';
  player1SecondCard.classList.remove('hidden');
  console.log('Player cash: ' + playerCash);
};

const bust = function () {
  dealerCash += playerBet; // Check this line missing +=
  dealerTotalCash.textContent = dealerCash;
  bets.textContent = 0;
  showResults.classList.remove('hidden');
  showResults.textContent = 'BUST! You lose the game';
  gameActive = false;
  allowHit = false;
};

const dealerWins = function () {
  dealerCash += playerBet;
  dealerTotalCash.textContent = dealerCash;
  bets.textContent = 0;
  showResults.classList.remove('hidden');
  showResults.textContent = 'The dealer won the round!';
  player1SecondCard.classList.remove('hidden');
};

const tieGame = function () {
  cashPot += playerBet;
  bets.textContent = cashPot;
  showResults.classList.remove('hidden');
  showResults.textContent = 'Tie game. No winner!';
  player1SecondCard.classList.remove('hidden');
};

// Scores and money

let currentScore = 0;
let playerCash = 500;
let dealerCash = 0;
let playerBet = 0;
let cashPot = 0;

// Game state

let noBets = false;
let gameActive = false;
let allowHit = false;

// Random card pick

// let ace;
// let aceChoice;
// let jack;
// let queen;
// let king;
const cardsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const dealCard = cardsArray[Math.floor(Math.random() * [cardsArray.length])];
const cardSuit = ['hearts', 'diamonds', 'spades', 'clubs'];

function playerDraw(num1, num2) {
  num1 = num1[Math.floor(Math.random() * [num1.length])];
  if (num1 === 1) {
    let decision = Number(prompt('Pick 1 or 11 for the ace'));
    if (decision === 1) {
      currentScore += decision;
      player0Score.textContent = currentScore;
      num2.src = `images/PNG-cards-1.3/ace_of_${randomizeSuit(cardSuit)}.png`;
      // console.log('Player drew a: ' + num1);
      return currentScore;
    } else {
      decision = 11;
      currentScore += decision;
      player0Score.textContent = currentScore;
      num2.src = `images/PNG-cards-1.3/ace_of_${randomizeSuit(cardSuit)}.png`;
      // console.log('Player drew a: ' + num1);
      return currentScore;
    }
  } else if (num1 === 11) {
    num1 = 10;
    currentScore += num1;
    player0Score.textContent = currentScore;
    num2.src = `images/PNG-cards-1.3/jack_of_${randomizeSuit(cardSuit)}2.png`;
    return currentScore;
  } else if (num1 === 12) {
    num1 = 10;
    currentScore += num1;
    player0Score.textContent = currentScore;
    num2.src = `images/PNG-cards-1.3/queen_of_${randomizeSuit(cardSuit)}2.png`;
    return currentScore;
  } else if (num1 === 13) {
    num1 = 10;
    currentScore += num1;
    player0Score.textContent = currentScore;
    num2.src = `images/PNG-cards-1.3/king_of_${randomizeSuit(cardSuit)}2.png`;
    return currentScore;
  } else {
    num2.src = `images/PNG-cards-1.3/${num1}_of_${randomizeSuit(cardSuit)}.png`;
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
  // bets.classList.add('hidden');
  showResults.classList.add('hidden');
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  playerBet = 0;
  currentScore = 0;
  dealerScore = 0;
  noBets = false;
  player0FirstCard.classList.add('hidden');
  player0SecondCard.classList.add('hidden');
  player1FirstCard.classList.add('hidden');
  player1SecondCard.classList.add('hidden');
  console.log('You pressed the new game button!');
});

// Place bet

btnPlaceBet.addEventListener('click', function () {
  if (noBets !== true) {
    if (playerCash <= 0) {
      // Can't start a new game
      noBets = true;
      showResults.classList.remove('hidden');
      showResults.textContent = "You don't have enough cash to play!";
      console.log('Cash = ' + playerCash);
    } else {
      gameActive = true;
      playerBet = Number(prompt('Place your bet'));
      if (playerBet > playerCash) {
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
        playerBet += cashPot; // Bet is combined with cashPot left over from a tie game
        cashPot = 0;
        bets.classList.remove('hidden');
        bets.textContent = playerBet;
        playerTotalCash.textContent = playerCash;
        noBets = true;
        console.log('Remaining cash: ' + playerCash);
        console.log('Player bets: ' + playerBet);
        player1FirstCard.classList.remove('hidden');
        dealerDraw(cardsArray, player1FirstCard);
        player1Score.textContent = dealerScore;
        console.log('Dealer draws a ' + dealerScore);
        player0FirstCard.classList.remove('hidden');
        playerDraw(cardsArray, player0FirstCard);
        console.log('Player draws a ' + currentScore);
      }
    }
  }
});

// Deal - round 2

btnDeal.addEventListener('click', function () {
  if (gameActive === true) {
    playerDraw(cardsArray, player0SecondCard);
    player0SecondCard.classList.remove('hidden');
    console.log('Player score = ' + currentScore);
    dealerDraw(cardsArray, player1SecondCard); // Dealer's second card is drawn, but hidden
    console.log('Dealer score = ' + dealerScore + ' (second roll hidden)');
    gameActive = false;
    allowHit = true;
    if (currentScore === 21) {
      playerCash += playerBet * 1.5;
      playerTotalCash.textContent = playerCash;
      bets.textContent = 0;
      showResults.classList.remove('hidden');
      showResults.textContent = 'You rolled Blackjack and won the game!';
      allowHit = false;
      console.log(playerCash);
    } else if (currentScore > 21) {
      // This check is only to prevent bugs
      bust(); // This will only happen if a player makes their first and second ace card an 11
    }
  }
});

// Hit

btnHit.addEventListener('click', function () {
  if (allowHit === true) {
    playerDraw(cardsArray, player0SecondCard);
    player0Score.textContent = currentScore;
    if (currentScore > 21) {
      bust();
    } else if (currentScore === 21) {
      playerWins();
      gameActive = false;
      allowHit = false;
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
      dealerDraw(cardsArray, player1SecondCard);
      player1Score.textContent = dealerScore;
      console.log('Dealer score: ' + dealerScore);
      if (dealerScore > 21) {
        playerWins();
      } else if (dealerScore < 21 && dealerScore > currentScore) {
        dealerWins();
      } else if (dealerScore < 21 && dealerScore < currentScore) {
        playerWins();
      } else if (dealerScore === currentScore) {
        tieGame();
      }
    } else if (dealerScore > currentScore && !(dealerScore > 21)) {
      dealerWins();
    } else if (dealerScore === currentScore) {
      tieGame();
    } else {
      playerWins();
    }
  }
});
