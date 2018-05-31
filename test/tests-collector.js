'use strict';

// File system modules
let fs = require("fs");
let path = require("path");
let replace = require("replace");

module.exports = {
    collectTests: function(){
        let fileNameRegex = new RegExp('unit\\' + path.sep + '(?:FSS)\\' + path.sep + '.*');
        console.log('Collect all test that match regex: ' + fileNameRegex);

        // Loop throw all files and collect file names
        let looper = function(unitPath){
            let tests = [];
            let pathList = walkSync(unitPath, []);
            let item = 0;
            let currentPath;
            while (currentPath = pathList[item]) {
                //noinspection JSUnresolvedFunction
                if (!fs.lstatSync(currentPath).isDirectory()) {
                    let fileMatch = currentPath.match(fileNameRegex);
                    if (fileMatch) {
                        //noinspection RegExpSingleCharAlternation
                        let testName = fileMatch[0].split('.')[0].replace('unit', 'TEST').replace(/\\|\//g, '.');
                        tests.push(testName);
                    }
                }
                else
                    if (currentPath !== '.' && currentPath !== '..') {
                        tests = tests.concat(looper(currentPath));
                    }
                item++
            }
            
            return tests;
        };
        
        // Read all file paths in a dir
        let walkSync = function(dir, fileList){
            let files = fs.readdirSync(dir);
            fileList = fileList || [];
            files.forEach(function(file){
                if (fs.statSync(path.join(dir, file)).isDirectory()) {
                    fileList = walkSync(path.join(dir, file), fileList);
                }
                else {
                    fileList.push(path.join(dir, file));
                }
            });
            return fileList;
        };
        
        // Read all files in unit dir
        let startDir = path.join(__dirname, '/unit');
        let allTests = looper(startDir);
        
        if (allTests.length === 0) {
            console.error('Warning!!! No tests found... Add some test first!');
        }
        
        let appJsPath = process.cwd() + path.sep + 'test' + path.sep + 'app.js';
        let appJsTestPath = process.cwd() + path.sep + 'test' + path.sep + 'test-app.js';
        
        fs.copyFile(appJsTestPath, appJsPath, function(){
            console.log('Test app.js is created.');
        });
        
        replace({
            regex: "###TEST_CLASS###",
            replacement: allTests.join("','"),
            paths: [appJsPath],
            recursive: false,
            silent: true,
        });
    }
};