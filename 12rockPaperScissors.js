document
  .querySelector(".js-rock-move-btn")
  .addEventListener("click", function () {
    playGame("rock");
  });

document
  .querySelector(".js-paper-move-btn")
  .addEventListener("click", function () {
    playGame("paper");
  });

document
  .querySelector(".js-scissors-move-btn")
  .addEventListener("click", function () {
    playGame("scissors");
  });

const autoPlayBtnEl = document.querySelector(".auto-play-button");
autoPlayBtnEl.addEventListener("click", function () {
  autoPlay();
});

let score = JSON.parse(localStorage.getItem("scoreTrial")) || {
  win: 0,
  loose: 0,
  tie: 0,
};

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const pickPlayerMove = pickComputerMove();
      playGame(pickPlayerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlayBtnEl.innerText = "Stop Auto Play";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayBtnEl.innerText = "Auto Play";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (
    (playerMove === "rock" && computerMove === "rock") ||
    (playerMove === "paper" && computerMove === "paper") ||
    (playerMove === "scissors" && computerMove === "scissors")
  ) {
    result = "Tie";
    score.tie++;
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You Win";
    score.win++;
  } else if (
    (playerMove === "rock" && computerMove === "paper") ||
    (playerMove === "paper" && computerMove === "scissors") ||
    (playerMove === "scissors" && computerMove === "rock")
  ) {
    result = "You Loose";
    score.loose++;
  }
  document.querySelector(".js-result").innerText = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img style="height: 60px;" src="./images/${playerMove}-emoji.png"> <img style="height: 60px;" src="./images/${computerMove}-emoji.png"> Computer `;

  localStorage.setItem("scoreTrial", JSON.stringify(score));

  updateScoreElement();
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();

  if (randomNumber > 0 && randomNumber <= 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber > 2 / 3 && randomNumber <= 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

document.querySelector(".reset-score-button").addEventListener("click", () => {
  resetScore();
});

function resetScore() {
  score.win = 0;
  score.loose = 0;
  score.tie = 0;
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.win} <br> Loose: ${score.loose} <br> Ties: ${score.tie} <br>`;
}
