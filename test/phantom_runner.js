setTimeout(function(){
    console.log('PhantomJS hanged or tests took more than 5 minutes');
    phantom.exit(1);
}, 300000);

var system = require("system"), fs = require("fs"), page = require("webpage").create(), showColor = false, url = system.args[1];

if (system.args[1] == "--no-color" || system.args[2] == "--no-color") {
    showColor = false;
    if (system.args[1] == "--no-color") {
        url = system.args[2];
    }
}

page.onConsoleMessage = function(msg){
    //fs.write("/dev/stdout", msg, "w");
    if (msg && msg.length > 1) {
        console.log(msg);
    }
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

var dateStarted = Date.now();
page.onCallback = function(message){
    if (message === "parse time") {
        page.evaluate(function(showColor){
            jasmineRequire.console(jasmineRequire, jasmine);
            var consoleReporter = jasmine.ConsoleReporter({
                print: function(){
                    console.log.apply(console, arguments);
                },
                showColors: showColor,
                timer: new jasmine.Timer()
            });
            jasmine.getEnv().addReporter(consoleReporter);
            jasmine.getEnv().addReporter({
                jasmineDone: function(){
                    window.callPhantom('jasmine done');
                },
                specDone: function(result){
                    if (!window.clinicalTestsData) {
                        window.clinicalTestsData = {};
                    }
                    
                    var testData = window.clinicalTestsData;
                    var testName = result.fullName.split(' ')[0];
                    if (!testData[testName]) {
                        testData[testName] = [];
                    }
                    var current = testData[testName];
                    var currentData = {
                        name: result.description
                    }
                    
                    var failed = result.failedExpectations;
                    if (failed.length) {
                        currentData.message = failed[0].message;
                        currentData.stack = failed[0].stack;
                    }
                    else
                        if (result.status === 'pending') {
                            currentData.skipped = true;
                        }
                    
                    current.push(currentData);
                    
                    window.specsFailed = window.specsFailed || (result.status === "failed")
                }
            });
        }, showColor);
    }
    else
        if (message === "jasmine done") {
            var timeElapsed = Date.now() - dateStarted, minimumExecutionTime = 1500;
            
            var exitCode = page.evaluate(function(){
                return window.specsFailed ? 1 : 0;
            });
            
            var testsData = page.evaluate(function(){
                return window.clinicalTestsData;
            });
            
            for (var currentTestName in testsData) {
                var currentTest = testsData[currentTestName];
                var reportFilePath = '../../surefire-reports/TEST-' + currentTestName + '.xml';
                var testCasesText = '';
                var currentTestCase;
                var item = 0;
                var testsLength = currentTest.length;
                var failedCount = 0;
                var skippedCount = 0;
                while (item < testsLength) {
                    currentTestCase = currentTest[item];
                    var nameSafe = currentTestCase.name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
                    testCasesText += '<testcase classname="' + currentTestName + '" name="' + nameSafe + '" time="0"';
                    if (currentTestCase.stack) {
                        testCasesText += '>\r\n';
                        testCasesText += '<failure message="' + currentTestCase.message + '">' + currentTestCase.stack + '</failure>\r\n';
                        testCasesText += '</testcase>\r\n';
                        failedCount++;
                    }
                    else
                        if (currentTestCase.skipped) {
                            testCasesText += '>\r\n';
                            testCasesText += '<skipped />';
                            testCasesText += '</testcase>\r\n';
                            skippedCount++;
                        }
                        else {
                            testCasesText += ' />\r\n';
                        }
                    
                    item++;
                }
                var reportFileContent = '<?xml version="1.0" encoding="UTF-8"?>\r\n';
                reportFileContent += '<testsuites>\r\n';
                reportFileContent += '<testsuite name="' + currentTestName + '" errors="0" skipped="' + skippedCount + '" tests="' + testsLength + '" failures="' + failedCount + '" time="0" timestamp="2013-05-24T10:23:58">\r\n';
                reportFileContent += testCasesText;
                reportFileContent += '</testsuite>\r\n';
                reportFileContent += '</testsuites>';
                
                fs.write(reportFilePath, reportFileContent, 'w');
            }
            
            if (exitCode) {
                fs.write('../../testsFailed.flag', '', 'w');
            }
            
            var exitFn = function(){
                page.evaluate(function(){
                    jscoverage_report('phantom');
                });
                
                phantom.exit(0);
            };
            
            if (timeElapsed < minimumExecutionTime) {
                setTimeout(exitFn, minimumExecutionTime - timeElapsed);
            }
            else {
                exitFn();
            }
        }
};

page.open(url, function(status){
    if (status !== "success") {
        console.log("could not successfully open up page at: " + url);
        phantom.exit(1);
    }
});
