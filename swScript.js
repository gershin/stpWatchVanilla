const timeDisplay = document.querySelector(".timerDisplay");
const splits = document.querySelectorAll(".split-time");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const splitBtn = document.querySelector(".split");
const resetBtn = document.querySelector(".reset");

let startTime,
  elapsedTime = 0,
  intervalTime,
  splitCount = 0;

function startTimer() {
  startTime = Date.now() - elapsedTime;
  intervalTime = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateTimer(elapsedTime);
  }, 10);
}

function stopTimer() {
  clearInterval(intervalTime);
}

function splitTime() {
  splitCount++;
  if (splitCount > splits.length) {
    return;
  }
  splits[splitCount - 1].textContent = timeDisplay.textContent;
}

function resetTimer() {
  clearInterval(intervalTime);
  elapsedTime = 0;
  updateTimer(elapsedTime);
  for (let i = 0; i < splits.length; i++) {
    splits[i].textContent = "--:--:--";
  }
  splitCount = 0;
}

function updateTimer(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time - minutes * 60000) / 1000);
  const milliseconds = Math.floor(
    (time - minutes * 60000 - seconds * 1000) / 10
  );
  const displayValue = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  timeDisplay.textContent = displayValue;
}

function pad(number) {
  return number < 10 ? `0${number}` : number;
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
splitBtn.addEventListener("click", splitTime);
resetBtn.addEventListener("click", resetTimer);
