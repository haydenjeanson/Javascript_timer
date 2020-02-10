const TIME_INTERVAL = 10;
const ONE_MINUTE = 60;
var timerMinutes = 10;
var timerSeconds = 0;
var timerMili = 1000;
var time = "";
time = time.concat(timerMinutes, ":", "0", timerSeconds);;
var timerId = null;

function timerState() {
    if (document.getElementById("timer").style.display == "block") {
        document.getElementById("timer").style.display = "none";
        document.getElementById("btn_timerState").value = "Show Timer";
        document.getElementById("btn_timerFlip").style.display = "none";
        document.getElementById("btn_addTime").style.display = "none";
        clearInterval(timerId);
        timerId = null;
    } else {
        document.getElementById("timer").style.display = "block";
        document.getElementById("btn_timerState").value = "Hide Timer";
        document.getElementById("timer").innerHTML = "";
        document.getElementById("timer").innerHTML = time;
        document.getElementById("btn_timerFlip").style.display = "inline";
        document.getElementById("btn_addTime").style.display = "inline";
        flipTimer()
    }
}

function addTime() {
    var minutesAdded = prompt("Minutes to add:");
    var secondsAdded = prompt("Seconds to add:");
    if (isNaN(minutesAdded) || isNaN(secondsAdded)) {
        alert("One or more values was not a valid integer.");
    } else {
        timerMinutes += parseInt(minutesAdded);
        if ((timerSeconds += parseInt(secondsAdded)) >= ONE_MINUTE) {
            timerMinutes += Math.floor(timerSeconds / ONE_MINUTE);
            timerSeconds = timerSeconds % ONE_MINUTE;
        }

    }
}

function flipTimer() {
    if (timerId != null) {
        document.getElementById("btn_timerFlip").value = "Start Timer";
        clearInterval(timerId);
        timerId = null;
    } else {
        document.getElementById("btn_timerFlip").value = "Stop Timer";
        timerId = setInterval(myTimer, TIME_INTERVAL);
        if (timerSeconds < 10) {
            time = time.concat(timerMinutes, ":", "0", timerSeconds);
        } else {
            time = time.concat(timerMinutes, ":", timerSeconds);
        }
    }
}

function myTimer() {
    if (timerMili > 0) {
        timerMili -= TIME_INTERVAL;
    } else {
        if (timerSeconds > 0) {
            timerSeconds -= 1;
        } else {
            timerSeconds = 59
            timerMinutes -= 1;
        }

        if (timerMinutes <= 0) {
            stopTimer();
        }
        time = new String(timerMinutes)
        if (timerSeconds < 10) {
            time = time.concat(":", "0", timerSeconds);
        } else {
            time = time.concat(":", timerSeconds);
        }

        document.getElementById("timer").innerHTML = time;
        timerMili = 1000;
    }
}