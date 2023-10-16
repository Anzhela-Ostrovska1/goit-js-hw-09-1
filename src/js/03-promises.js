import Notiflix from 'notiflix';

const delayInput = document.querySelector('input[name="delay"]');
const stepDelayInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

form.addEventListener('submit', createPromises);

function delayValue1(value) {
  value = delayInput.value;
  return parseInt(value);
}

function createPromises(event) {
  event.preventDefault();
  const stepDelayValue = parseInt(stepDelayInput.value);
  const amountValue = parseInt(amountInput.value);

  for (let i = 0; i < amountValue; i++) {
    const position = i + 1;
    const delay = delayValue1() + stepDelayValue * i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            timeout: 5000,
          }
        );
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            timeout: 5000,
          }
        );
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// для 1 промиса код должен исполнится через delay времени (amount[0], через сетТаймаут исполнить )
