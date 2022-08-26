var robot = require("robotjs");
var { exec } = require('child_process');
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


// while (true) {
//     let xx = robot.getMousePos().x;
//     let yy = robot.getMousePos().y;
//     console.log(xx, yy, width);
// }
startListen();
function startListen() {
    inter = setInterval(e => {
        let x = robot.getMousePos().x;
        let y = robot.getMousePos().y;

        if (tempx === x && tempy == y) {
            start();
        }
        tempx = x;
        tempy = y;
    }, 1000 * 60 * 2)
}


function isOut() {
    const isCheckIn = momnet().isBetween(momnet().hour(14).minute(00), momnet().hour(16).minute(00));
    const isCheckout = momnet().isBetween(momnet().hour(21).minute(23), momnet().hour(21).minute(28));
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
            exec('pkill -STOP sfproc');
            startListen();
            return;
        }

        exec('pkill -CONT sfproc');
        if (xx === 0 && yy === 0) {
            startListen();
            break;
        }
        var randomNumber = Math.floor(Math.random() * textArray.length);

        for (var x = 0; x < 5; x++) {
            robot.moveMouseSmooth(Math.floor(Math.random() * 1080), Math.floor(Math.random() * 1920))
        }
        k++;

        duleFn('alt', 'tab', k);

        if (k == 5) {
            k = 0;
        }

    }
}
