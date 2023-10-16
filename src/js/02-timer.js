import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const inputCalendar = document.querySelector('#datetime-picker');
const timerEl = document.querySelector('.timer');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

startBtn.addEventListener('click', onStartBtnClick);
startBtn.disabled = true;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate - Date.now() < 1000) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 2000,
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputCalendar, options);

const timer = {
  intervalId: null,
  start() {
    const startTime = selectedDate;

    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = startTime - currentTime;

      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }
      const time = convertMs(deltaTime);
      updateClockface(time);
    }, 1000);
  },
};

function onStartBtnClick() {
  startBtn.disabled = true;
  timer.start();
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  const days = addLeadingZero(Math.floor(ms / day));

  return { days, hours, minutes, seconds };
}

timerEl.style.display = 'flex';
timerEl.style.justifyContent = 'center';
timerEl.style.alignItems = 'center';

const fields = timerEl.querySelectorAll('.field');
fields.forEach(function (field) {
  field.style.margin = '10px';
  field.style.padding = '10px';
  field.style.backgroundColor = 'red';
  field.style.color = 'black';
  field.style.borderRadius = '5px';
  field.style.textAlign = 'center';
});

const values = timerEl.querySelectorAll('.value');
values.forEach(function (value) {
  value.style.fontSize = '36px';
  value.style.fontWeight = 'bold';
});
