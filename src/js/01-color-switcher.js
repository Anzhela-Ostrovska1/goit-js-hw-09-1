const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

const COLOR_CHANGE = 1000;
let timeoutId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
}

function onStartBtnClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timeoutId = setInterval(() => {
    changeColor();
  }, COLOR_CHANGE);
}

function onStopBtnClick() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timeoutId);
}
