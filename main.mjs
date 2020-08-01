// // Global Variable
militaryTime = false;
var today = new Date();



// // Sets the date\
var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
document.getElementById('current_date').innerHTML = date;



function increment() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    


    if (hours < 10) {
        hours = '0' + hours;
    }
    if (hours == 0) {
        hours = 12;                
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
        if (hours > 12) {
            hours = hours - 12
        }
        time = (hours) + ":" + minutes + ":" + seconds;
        document.getElementById('current_time').innerHTML = time;
    } 

}


// // Sets the interval at 1000 ms
setInterval(increment, 1000);

// // Links to HTML button file
const toggle = document.getElementById('toggle')

// // This is toggling the on and off for military vs standard time
toggle.addEventListener('click', function () {
    militaryTime = !militaryTime;
});



