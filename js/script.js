const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  typingInput = document.querySelector(".typing-input");
  timer = document.querySelector(".timer span");
  wins = document.querySelector(".wins span");
  losses = document.querySelector(".losses span");

let word, maxGuesses, incorrectLetters = [], correctLetters = [], seconds = 0, numWins = 0, numLosses = 0;

function randomWord() {
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word;
  correctLetters = [];
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  wrongLetter.innerText = incorrectLetters;
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }
}

randomWord();

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctLetters.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correctLetters += key;
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      incorrectLetters.push(` ${key}`);
    }

    wrongLetter.innerText = incorrectLetters;
  }
  typingInput.value = "";

  setTimeout(() => {
    if (correctLetters.length === word.length) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      numWins++;
      wins.innerText = numWins;
      resetGame();
    } else if (seconds === 0) {
      alert("Game over! You ran out of time");
      numLosses++;
      losses.innerText = numLosses;
      resetGame();
    }
  }, 100);
}

function startTimer() {
  seconds = 60;
  timer.innerText = seconds;
  intervalId = setInterval(() => {
    seconds--;
    timer.innerText = seconds;
    if (seconds === 0) {
      clearInterval(intervalId);
      initGame({ target: { value: "" } });
    }
  }, 1000);
}
startTimer();

function resetGame() {
  clearInterval(intervalId);
  randomWord();
  startTimer();
  incorrectLetters = [];
  correctLetters = [];
  wrongLetter.innerText = "";
  typingInput.value = "";
}

resetBtn.addEventListener("click", resetGame);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
