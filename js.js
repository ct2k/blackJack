// Blackjack

// Random card pick

const randomCard = function () {
  return Math.floor(Math.random() * 11) + 1;
};
// console.log(randomCard());

let playerCards;
score = 0;

// Draw card

const startBtn = document.querySelector('.startgame');
const showScore = document.querySelector('.score');

// const startGame = function () {
//   if (playerCards === 21) {
//     showScore.textContent = score + ' You win Blackjack!';
//   } else if (playerCards > 21) {
//     showScore.textContent = score + ' You lose the game!';
//   } else {
//     showScore.textContent = score + ' Draw a new card?';
//   }
// };

// startBtn.addEventListener('click', startGame);
// console.log(startGame());

const drawBtn = document.querySelector('.drawcard');

drawBtn.addEventListener('click', drawCard);

function drawCard() {
  randomCard();
}

console.log(drawCard());
