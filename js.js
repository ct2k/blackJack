'use strict';

// Selecting elements

const btnDraw = document.querySelector('.drawcard');
const btnNewGame = document.querySelector('.newgame');
const drawCard = document.querySelector('.randomcard');

// Random card pick

btnDraw.addEventListener('click', function () {
  const randomCard = Math.floor(Math.random() * 21) + 1;
  drawCard.classList.remove('hidden');
  drawCard.textContent = randomCard;
  console.log(randomCard);
});

btnNewGame.addEventListener('click', function () {
  console.log(btnNewGame.textContent);
});
