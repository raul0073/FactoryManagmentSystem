// funcking date time format
let dtime = new Date();
let dateElem = document.querySelector('.date');
let y = dtime.getFullYear();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let m = months[dtime.getMonth()];

let d = dtime.getDate();
let hrs = dtime.getHours();
let min = dtime.getMinutes();
let s = dtime.getSeconds();

let dateTime = `${d} ${m}, ${y} | ${hrs}:${min}:${s}`;
// set html elem as date time
dateElem.innerText = dateTime;


// date for app