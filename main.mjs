// Sets the date
var today = new Date();
var date = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
console.log(today);
document.all[10].textContent = date;

// Sets the time
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log(time);
document.all[12].textContent = time;

// Sets the date AND time
// var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date +' '+ time;
// console.log(dateTime);

// You can not use for a timestamp by linking this 
// with an action and writing it in a log file.

// Examine The Document Object
// console.dir(document);

console.log(document.domain);
console.log(document.URL);
console.log(document.title);
console.log(document.doctype);
console.log(document.head);
console.log(document.all);
console.log(document.all[10]);