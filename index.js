var robot = require("robotjs");
var {exec} = require('child_process');
var momnet = require('moment');

// Speed up the mouse.
robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

var textArray = [
    'SQL Query',
    'Java Log4js',
    'Angular new update',
    'Angular js issue in configuration',
];

const duleFn = (start, end, t = 1) => {
    robot.keyToggle(start, 'down');
    for (var i = 0; i < t; i++) {
        robot.keyTap(end);
    }
    robot.keyToggle(start, 'up')
}
let tempx = robot.getMousePos().x;
let tempy = robot.getMousePos().y;

var k = 0;
let inter;

startListen();
function startListen() {
    inter = setInterval(e => {
        let x = robot.getMousePos().x;
        let y = robot.getMousePos().y;

        if (tempx === x && tempy == y) {
            exec('pkill -CONT sfproc');
            start();
        }
        tempx = x;
        tempy = y;
    }, 1000 * 60 * 2)
}


function isOut() {
    const isCheckIn = momnet().isBetween(momnet().hour(14).minute(00), momnet().hour(16).minute(00));
    const isCheckout = momnet().isBetween(momnet().hour(21).minute(28), momnet().hour(21).minute(33));
    if (isCheckIn || isCheckout) {
        return true;
    }
    return false;
}

function start() {
    clearInterval(inter);
    while (true) {
        let xx = robot.getMousePos().x;
        let yy = robot.getMousePos().y;

        if (isOut()) {
            startListen();
            return;
        }

        if (xx === 1365 && yy === 0) {
            startListen();
            break;
        }
        var randomNumber = Math.floor(Math.random() * textArray.length);

        for (var x = 0; x < width; x++) {
            y = height * Math.sin((twoPI * x) / width) + height;
            robot.moveMouse(x, y);
        }

        for (var x = width; x > 0; x--) {
            y = height * Math.sin((twoPI * x) / width) + height;
            robot.moveMouse(x, y);
        }
        k++;

        duleFn('alt', 'tab', k);

        if (k == 5) {
            k = 0;
        }

    }
}


