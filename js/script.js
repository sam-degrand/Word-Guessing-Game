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
  // Get a random word from the wordList array
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
   // Set the word and hint based on the randomly selected item
  word = ranItem.word;
  correctLetters = [];
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  wrongLetter.innerText = incorrectLetters;
  // Build the input fields for each letter in the word
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }
}
// Start the game by selecting a random word and setting up the input fields
randomWord();

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctLetters.includes(key)
  ) {
    if (word.includes(key)) {
      // If the key is in the word, update the input fields with the new letter
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correctLetters += key;
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      // If the key is not in the word, add it to the incorrect letters array
      incorrectLetters.push(` ${key}`);
    }

    wrongLetter.innerText = incorrectLetters;
  }
  typingInput.value = "";

  setTimeout(() => {
    if (correctLetters.length === word.length) {
      // If all the letters have been guessed correctly, show a message and select a new word
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
      // If the timer runs out, show a message and select a new word
      clearInterval(intervalId);
      initGame({ target: { value: "" } });
    }
  }, 1000);
}
// Start the timer
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
// Attach event listeners to reset the game when the reset button is clicked or a new letter is typed
resetBtn.addEventListener("click", resetGame);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
