
// Sets the date
var today = new Date();
var date = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
console.log(today);
document.all[10].textContent = date;
// var dates = document.getElementsByClassName('date');
// // console.log(dates);


// Sets the time
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
document.all[12].textContent = time;
console.log(time);


// let i = 0;

// function increment() {
//   i++;
//   console.log(i);
// }

// setInterval(increment, 1000);
