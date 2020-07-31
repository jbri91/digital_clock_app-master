
// Sets the date
var today = new Date();
var date = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
document.getElementById('current_date').innerHTML = date;

// Sets the interval at 1000 ms
setInterval(increment, 1000);

// Sets the time
//The function allows for the seconds to tick every 1000 ms.
function increment() {
today = new Date();
time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
document.getElementById('current_time').innerHTML = time;
}

// document.addEventListener('click', function(e) {
//     console.log(e)
// });

// document.addEventListener('click', function(e) {
//     console.log(e)
// });

const toggle = document.getElementById('toggle')
console.log(toggle)

toggle.addEventListener('click', function() {
        time = (today.getHours()-12) + ":" + today.getMinutes() + ":" + today.getSeconds();
        document.getElementById('current_time').innerHTML = time;
    });






    
/*Very top-level element is 'document'.
document.addEventListener ('keyup', function(e) {

do something when button is cicked

}) */


/* To attach to lower-level elements, the elemnts must be first located 
in the DOM so the event listener can be attached to it. You use get ElementById
or any other slector to locate the element.

Locating the element
const button = document.getElementById('myButton')

connecting an event listener to the element
button.addEventListener('click', fucntion(e) {
    do something when button is clicked
// */

