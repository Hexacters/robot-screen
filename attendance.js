var robot = require("robotjs");
var momnet = require('moment');
var cp = require('child_process');

// Speed up the mouse.
robot.setMouseDelay(2);

const duleFn = (start, end, t = 1) => {
    robot.keyToggle(start, 'down');
    for (var i = 0; i < t; i++) {
        robot.keyTap(end);
    }
    robot.keyToggle(start, 'up')
}

const toggle = () => {
    robot.moveMouseSmooth(393, 192);
    duleFn('command', '3');
    duleFn('control', 't');

    robot.typeString('https://people.mookambikainfo.com/');

    // Press enter.
    robot.keyTap("enter");

    setTimeout(() => {
        robot.mouseClick();
    }, 10000);
}



const start = async () => {
    const isCheckIn = momnet().isBetween(momnet().hour(9).minute(28), momnet().hour(9).minute(35));
    const isCheckout = momnet().isBetween(momnet().hour(21).minute(28), momnet().hour(21).minute(33));
    console.clear();
    console.log("Zoho Attendance - Auto Check-in check-out")
    console.log("Last Check at: - " + momnet().format('hh:mm:ss A'));

    if (isCheckIn) {
        toggle();
        return;
    }

    if (isCheckout) {
        toggle();
        return;
    }
}

// Start the Program
setInterval(start, 5000 * 60)
start();