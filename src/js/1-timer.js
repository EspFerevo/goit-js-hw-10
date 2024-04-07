'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    const startButton = document.getElementById('start-button');

    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer(endTime) {
  const timerFields = document.querySelectorAll('.value');

  const timeInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = endTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timeInterval);
      timerFields.forEach(field => (field.textContent = '00'));
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
      });
      document.getElementById('datetime-picker').disabled = false;
      document.getElementById('start-button').disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    timerFields[0].textContent = addLeadingZero(days);
    timerFields[1].textContent = addLeadingZero(hours);
    timerFields[2].textContent = addLeadingZero(minutes);
    timerFields[3].textContent = addLeadingZero(seconds);
  }, 1000);
}

document.getElementById('start-button').addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(
    document.getElementById('datetime-picker').value,
    'Y-m-d H:i'
  );

  const endTime = selectedDate;

  document.getElementById('datetime-picker').disabled = true;
  document.getElementById('start-button').disabled = true;

  updateTimer(endTime);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
