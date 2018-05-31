'use strict';

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        
        browsers: ['Chrome', 'ChromeHeadless'],
        
        basePath: '../',
        
        logLevel: config.LOG_INFO,
        
        crossOriginAttribute: false,
        
        files: [
            {pattern: './build/testing/FSS/app.json', included: false, served: true, watched: false, nocache: true},
            {pattern: './build/testing/FSS/app.js', included: false, served: true, watched: true, nocache: true},
            
            './tests/bootstrap.js',
            './tests/index.js',
            './tests/tests/**/*.spec.js'
        ],
        
        proxies: {
            '/app.js': '/base/build/testing/FSS/app.js'
        },
        
        // you can define custom flags
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    },
                },
                flags: ['--load-images=true'],
                debug: true
            }
        },
        
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }
    })
};

/*
module.exports = {
    getOptions: function(config){
        return {
            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '',
            
            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['jasmine'],
            
            // Files to be included in testing
            files: [],
            
            // list of files / patterns to exclude
            exclude: [
                'build/!*',
                'node_modules/!*',
                'cordova/!*'
            ],
            
            // Context html file
            customContextFile: 'context.html',
            
            // Debug html file, this is used to debug tests
            customDebugFile: 'debug.html',
            
            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {},
            
            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: [
                'spec',
                'live-html'
            ],
            
            // web server port
            port: 9876,
            
            // web static port for live html reporter
            staticPort: 9877,
            
            // enable / disable colors in the output (reporters and logs)
            colors: true,
            
            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,
            
            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,
            
            // start these browsers
            // available browser launchers: Chrome, ChromeHeadless
            browsers: [],
            
            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: false,
            
            // Browser re-try test if browser fails
            retryLimit: 1,
            
            // Concurrency level
            // how many browser should be started simultaneous
            concurrency: Infinity,
            
            // Karma plugins
            // only plugins in this list will be required by karma
            plugins: [
                'karma-jasmine',
                'karma-coverage',
                'karma-chrome-launcher',
                'karma-spec-reporter',
                'karma-html-live-reporter',
                'karma-extjs-jasmine-tester'
            ],
            
            // Spec reporter config
            specReporter: {
                maxLogLines: 5,                 // limit number of lines logged per test
                suppressErrorSummary: true,     // do not print error summary
                suppressFailed: false,          // do not print information about failed tests
                suppressPassed: false,          // do not print information about passed tests
                suppressSkipped: true,          // do not print information about skipped tests
                showSpecTiming: false,          // print the time elapsed for each spec
                failFast: false,                // test would finish with error when a first fail occurs.
                useColors: true
            },
            
            // html live reporter config
            htmlLiveReporter: {
                colorScheme: 'jasmine',
                defaultTab: 'summary', // 'summary' or 'failures' tab to start with
                
                // only show one suite and fail log at a time, with keyboard navigation
                focusMode: true
            },
            
            // karma coverage reporter config
            coverageReporter: {
                type: 'html',
                dir: 'test/coverage/'
            }
        };
    }
};*/
