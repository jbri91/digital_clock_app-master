
militaryTime = false;
const today = new Date();

const options = {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
}

const date = document.getElementById('current-date');
date.textContent=today.toLocaleString('en-us', options);

function increment() {
  let currentTime = document.getElementById('current-time');
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let meridiem;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  meridiem = hours >= 12 ? 'PM' : 'AM';

  if (militaryTime == true) {
    time = `${hours}:${minutes}:${seconds}`;
    currentTime.innerHTML = time;
  } else {
    hours = hours > 12 ? hours - 12: hours;
    currentTime.textContent = `${hours}:${minutes}:${seconds} ${meridiem}`;
  }
}



// // Links to HTML button file
const toggle = document.getElementById("toggle");

// // This is toggling the on and off for military vs standard time
toggle.addEventListener("click", function () {
  setInterval(increment, 1000);
  militaryTime = !militaryTime;
});

setInterval(increment, 1000);
