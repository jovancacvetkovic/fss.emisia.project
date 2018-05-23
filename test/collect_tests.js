setTimeout(function(){
    console.log('PhantomJS hanged or tests took more than 5 minutes');
    phantom.exit(1);
}, 300000);

var system = require("system"), fs = require("fs"), page = require("webpage").create(), showColor = true, url = system.args[1], testsToInclude = system.args[2];

if (system.args[1] == "--no-color" || system.args[2] == "--no-color") {
    showColor = false;
    if (system.args[1] == "--no-color") {
        url = system.args[2];
    }
}

page.onConsoleMessage = function(msg){
    //fs.write("/dev/stdout", msg, "w");
    console.log(msg);
};

page.onError = function(){
    console.log.apply(console, arguments);
};

page.onAlert = function(){
    console.log.apply(console, arguments);
};

if (!url) {
    console.log("argument is required: location of jasmine tests");
    phantom.exit(1);
}

var fileNameRegex = new RegExp('unit\\' + fs.separator + '(?:' + testsToInclude.replace(/,/g, '|') + ')\\' + fs.separator + '.*');

//Collect all test names
var looper = function(path){
    var tests = [];
    var pathList = fs.list(path);
    var item = 0;
    var current;
    while (current = pathList[item]) {
        var currentPath = path + fs.separator + current;
        if (fs.isFile(currentPath)) {
            //parse path to generate test name
            var fileMatch = currentPath.match(fileNameRegex);
            if (fileMatch) {
                var testName = fileMatch[0].split('.')[0].replace('unit', 'TEST').replace(/\\|\//g, '.');
                tests.push(testName);
            }
        }
        else
            if (current != '.' && current != '..') {
                tests = tests.concat(looper(currentPath));
            }
        item++
    }
    
    return tests;
}

var startDir = fs.workingDirectory + fs.separator + 'unit';
var allTests = looper(startDir);

if (allTests.length == 0) {
    console.log('No tests found...');
    phantom.exit(0);
}

var appJsPath = fs.workingDirectory + fs.separator + 'app.js';
var appJsFile = fs.read(appJsPath);
fs.write(appJsPath, appJsFile.replace('###TEST_CLASS###', allTests.join("','")), 'w');

phantom.exit(0);
