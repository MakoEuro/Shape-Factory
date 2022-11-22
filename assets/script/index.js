'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

// Selectors for all HTML elements
const clock = select('.clock');
const time = select('.time');
const alarmTime = select('.alarmTime');
const btn = select('.btn');
const alarmSet = select('.alarmSet');
const msg = select('.msg');

// Creates function for current time
function currentTime() {
    const today = new Date();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();
    let amPm = 'AM';
    mm = checkZero(mm);
    ss = checkZero(ss);

    if(hh == 0) {
        hh = 12;
    } else if (hh > 12) {
        hh = hh - 12;
        amPm = 'PM';
    }

    clock.innerText =  hh + ':' + mm + ':' + ss + ' ' + amPm;;
    let time = setTimeout(function(){ currentTime() }, 1000);
    return today;
}

// This function will add a zero to any number that is a single digit.
function checkZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

// Calls the current time function continously
currentTime();

function setAlarm() {
    let alarm = alarmSet.value.trim();

    let hoursInput = alarm.toString().substring(0, 2);
    let minsInput = alarm.toString().substring(3, 5);

    let hours = parseInt(hoursInput);
    let mins = parseInt(minsInput);

    let alarmQueue = new Date();

    alarmQueue.setHours(alarmQueue.getHours() + hours);
    alarmQueue.setMinutes(alarmQueue.getMinutes() + mins);

    alarmTime.innerText = alarmQueue.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return alarmQueue;
}

function alarmActive() {
    let val = setAlarm();
    let alarmVal = val.getTime();

    return alarmVal;
}

onEvent('click', btn, function() {
    setAlarm();
    alarmRing();
    sound();
    console.log('Alarm set');

    alarmSound.play();
});

let ring = false;
function alarmRing() {
    let alarmVal = alarmActive();

    // Sets alarm to ring when clock reaches time
    function ringAlarm() {
        let currentT = Number(currentTime());
        if (currentT >= alarmVal) {
            console.log('Alarm has rung.');
            ring = true;
            clearInterval(interval);
        }
    }

    let interval = setInterval(ringAlarm(), 1000);
}

const alarmSound = new Audio('./assets/audio/alarm.wav');
alarmSound.type = 'audio/wav';

function sound() {
    if(ring) {
        alarmSound.play();
        console.log('Sound played');
    }
}