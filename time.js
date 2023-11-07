function getTime() {
  function formatTime(i) {
    // Formats time as string with 2 digits using padStart
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    return i.toString().padStart(2, '0');
  }

  // Get the current date
  let currentDate = new Date();
  // Get the hours, minutes, seconds and format the numbers
  let currentHour = formatTime(currentDate.getHours());
  let currentMinute = formatTime(currentDate.getMinutes());
  let currentSecond = formatTime(currentDate.getSeconds());

  // Set the currentTime string in the format hour:minute:second eg. 09:05:30
  let currentTime = `${currentHour}:${currentMinute}:${currentSecond}`;

  // Set the inner HTML for the element with the id of time to be the currentTime string
  document.getElementById('time').innerHTML = currentTime;
}

// Run the function every second to keep the time current
setInterval(getTime, 1000);
