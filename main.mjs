
// Sets the date
var today = new Date();
var date = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
document.getElementById('current_date').innerHTML = date;

setInterval(increment, 1000);



// Sets the time
function increment() {
today = new Date();
time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
document.getElementById('current_time').innerHTML = time;
}


