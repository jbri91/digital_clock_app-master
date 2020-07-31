// Global Variable
militaryTime = false;


// Sets the date
var today = new Date();
var date = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
document.getElementById('current_date').innerHTML = date;

function standardTime() {
today = new Date();
hours = today.getHours();
if (hours < 0) {
    hours + '1';
}
}



function increment() {
  today = new Date();  
if (militaryTime == true) {
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById('current_time').innerHTML = time;
}
    else {
    time = today.getHours() - 12 + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById('current_time').innerHTML = time;
}
}


// Sets the interval at 1000 ms
setInterval(increment, 1000);

// Links to HTML button file
const toggle = document.getElementById('toggle')

// This is toggling the on and off for military vs standard time
toggle.addEventListener('click', function() {
    militaryTime = !militaryTime;
    });