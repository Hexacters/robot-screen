var robot = require("robotjs");
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

const duleFn = (start, end, t=1) => {
    robot.keyToggle(start, 'down');
    for(var i=0; i<t; i++){
        robot.keyTap(end);
    }
    robot.keyToggle(start, 'up')
}

var k=0;
while (true) {
    
    var randomNumber = Math.floor(Math.random()*textArray.length);

    // duleFn('control', 't');

    // duleFn('control', 'f4');
    
    //robot.typeString(textArray[randomNumber]);

    // Press enter.
    //robot.keyTap("enter");
   
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
        k=0;
    }




}
