'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function handlePromise(delay, state) {
  if (state === 'fulfilled') {
    iziToast.success({
      title: 'Success',
      message: `✅ Fulfilled promise in ${delay}ms`,
    });
  } else {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${delay}ms`,
    });
  }
}

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(this.elements.delay.value);
  const state = this.elements.state.value;

  createPromise(delay, state)
    .then(delay => handlePromise(delay, state))
    .catch(delay => handlePromise(delay, state));
});
