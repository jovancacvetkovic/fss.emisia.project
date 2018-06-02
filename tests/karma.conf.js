'use strict';

module.exports = function(config){
    
    let isDebug = process.env.DEBUG || false;
    let browsers = [isDebug ? 'Chrome' : 'ChromeHeadless'];
    
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',
        
        // karma base url
        urlRoot: '/',
        
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        
        // start these browsers
        // available browser launchers: Chrome, ChromeHeadless
        browsers: browsers,
        
        // web server port
        port: 9876,
        
        // Files to be included in testing
        files: [
//            'ext/build/ext-modern-all-debug.js',
            
            // messages
            'tests/messages.js',
            
            // application manifest
            './build/testing/FSS/app.json',
            './build/testing/FSS/app.js',
            
            // resources
//            './build/testing/FSS/resources/**/*.svg',
//            './build/testing/FSS/resources/**/*.ttf',
            
            {
                pattern: './build/testing/FSS/resources/**/*.png',
                watched: false,
                included: false,
                served: true,
                nocache: false
            },
            
            {
                pattern: './build/testing/FSS/resources/**/*.svg',
                watched: false,
                included: false,
                served: true,
                nocache: false
            },
            
            {
                pattern: './build/testing/FSS/resources/**/*.ttf',
                watched: false,
                included: false,
                served: true,
                nocache: false
            },
            
            {
                pattern: './build/testing/FSS/resources/**/*.otf',
                watched: false,
                included: false,
                served: true,
                nocache: false
            },
            
            {
                pattern: './build/testing/FSS/resources/**/*.woff',
                watched: false,
                included: false,
                served: true,
                nocache: false
            },
            
            // firebase manifest
            'manifest.json',
            
            // 3rd parties
            './build/testing/FSS/resources/FSS-all.css',
            './build/testing/FSS/resources/3rdparty/firebase/*.js',
            'firebase-config.json',
            
            // tests
            './tests/unit/FSS/**/*.spec.js'
        ],
        
        // list of files / patterns to exclude
        exclude: [
            'build/temp/!*',
            'build/production/!*',
            'build/development/!*',
            'node_modules/!*',
            'cordova/!*'
        ],
        
        proxies: {
            '/bootstrap.json': '/base/bootstrap.json',
            '/app.js': '/base/build/testing/FSS/app.js',
            '/app.json': '/base/build/testing/FSS/app.json',
            '/firebase-config.json': '/base/firebase-config.json',
            '/resources/': '/base/build/testing/FSS/resources/'
        },
        
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './build/testing/FSS/resources/3rdparty/**/*.js': ['sourcemap']
        },
        
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        
        // will cancel the current run and start a new run immediately when a change is detected
        restartOnFileChange: true,
        
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        
        // Browser re-try test if browser fails
        retryLimit: 0,
        
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'spec',
            'live-html',
            'coverage'
        ],
        
        // Karma plugins
        // only plugins in this list will be required by karma
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-spec-reporter',
            'karma-html-live-reporter',
            'karma-sourcemap-loader',
            'karma-json-fixtures-preprocessor'
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
            dir: 'tests/coverage/'
        },
        
        // Context html file
        customContextFile: 'tests/index.html',
        
        // Debug html file, this is used to debug tests
        customDebugFile: 'tests/index.html'
    })
};