
let militaryTime = false;

const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
}

const dateEl = document.getElementById('current-date');
const currentTime = document.getElementById('current-time');

function increment() {
  const now = new Date();
  dateEl.textContent = now.toLocaleString('en-us', dateOptions);
  currentTime.textContent = formatTime(now.getHours(), now.getMinutes(), now.getSeconds(), militaryTime);
}

// Links to HTML button file
const toggle = document.getElementById("toggle");

// Toggles between military (24hr) and standard (12hr) time
toggle.addEventListener("click", function () {
  militaryTime = !militaryTime;
});

setInterval(increment, 1000);
increment();
