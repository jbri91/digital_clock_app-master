// // Global Variable
militaryTime = false;
var today = new Date();



// // Sets the date\
var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
document.getElementById('current_date').innerHTML = date;



function increment() {
    hours = today.getHours();
    minutes = today.getMinutes();
    seconds = today.getSeconds();
    today = new Date();

// if (hours < 0) {
//     hours = Math.abs(hours);       I tried to prevent a negative number from appearing.
// }
if (hours <10) {
    hours = '0' + hours;
}
if (hours = 0) {
    hours = 0 + 1;                 /* I am trying to prevent the hours from being 0.*/
}
if (minutes < 10) {
    minutes = '0' + minutes;
}
if (seconds < 10) {
    seconds = '0' + seconds;
}
if (militaryTime == true) {
    time = hours + ":" + minutes + ":" + seconds;
    document.getElementById('current_time').innerHTML = time;
}
    else {
    time = (hours -12) + ":" + minutes + ":" + seconds;
    document.getElementById('current_time').innerHTML = time;
} /*I am trying to prevent a negative number from appearing when it is 11 military time */
if (militaryTime == false && hours < 0) {       
    hours = Math.abs(hours);
}

}


// // Sets the interval at 1000 ms
setInterval(increment, 1000);

// // Links to HTML button file
const toggle = document.getElementById('toggle')

// // This is toggling the on and off for military vs standard time
toggle.addEventListener('click', function() {
    militaryTime = !militaryTime;
    });



