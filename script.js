const $ = document;
const checkBtn = $.querySelector(".guess-game__btn-check");
const guessNumber = $.querySelector(".guess-game__number");
let message = $.querySelector(".message");
let score = $.querySelector(".score");
let questionMarkBox = $.querySelector(".secret-number");
let highScoreTag = $.querySelector(".high-score");
let againBtn = $.querySelector(".guess-game__btn-headr");
let overlay = $.querySelector(".overlay");
let modal = $.querySelector(".modal");
let closeModalBtn = $.querySelector(".close-btn");

function showModal() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function hideModal() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}

function hideModalWithKey() {}

let secretNumber = Math.floor(Math.random() * 20) + 1;
let initScore = 20;
let highScore = 0;

function endGame() {
  message.textContent = "🧨 Game over";
  $.body.style.backgroundColor = "#efac8e";
  guessNumber.addEventListener("keydown", function (e) {
    e.preventDefault();
  });
  showModal();
}

function checkHandler() {
  const guess = +guessNumber.value;
  if (!guess) message.textContent = "⛔ Enter number between 1 to 20";
  else {
    if (guess === secretNumber) {
      message.textContent = "🎉 correct";
      $.body.style.backgroundColor = "#5ee87e";

      questionMarkBox.style.width = "15rem";
      questionMarkBox.textContent = secretNumber;

      if (highScore < initScore) {
        highScore = initScore;
        highScoreTag.textContent = "🏅 High score: " + initScore;
      }
    } else if (guess !== secretNumber) {
      if (initScore) {
        message.textContent =
          guess > secretNumber ? "📈 too high" : "📉 too low";
        initScore--;
        score.textContent = "💯 score: " + initScore;
      } else {
        endGame();
      }
    }
  }
}

function againHandler() {
  $.body.style.backgroundColor = "#222";
  score.textContent = "💯 score: " + 20;
  initScore = 20;
  secretNumber = Math.floor(Math.random() * 20) + 1;
  message.textContent = "start guessing...";
  questionMarkBox.style.width = "10rem";
  questionMarkBox.textContent = "?";
  guessNumber.value = "";
}

checkBtn.addEventListener("click", checkHandler);
againBtn.addEventListener("click", againHandler);
closeModalBtn.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);
// $.body.addEventListener("keydown", hideModalWithKey);
