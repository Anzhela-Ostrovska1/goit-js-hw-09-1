const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

COLOR_CHANGE = 1000;
let timeoutId = null;

function onStartBtnClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timeoutId = setInterval(() => {
    changeColor();
  }, COLOR_CHANGE);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
}

function onStopBtnClick() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearTimeout(timeoutId);
}
