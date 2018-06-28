'use strict';
var path = require('path');

module.exports = function (config) {
    // File mapper fn
    let getFileConfig = function (files) {
        files = files.map(function (file) {
            return {
                pattern: file,
                watched: false,
                included: false,
                served: true,
                nocache: false
            };
        });

        return files;
    };

    // Set debugging via Chrome or run ChromeHeadless in intelliJ
    let isDebug = !!process.env.DEBUG;
    console.log('\nDEBUG mode is', isDebug ? 'ON' : 'OFF');
    let browsers = [isDebug ? 'Chrome' : 'ChromeHeadless'];

    let reports = [];
    let plugins = [];
    let preprocessors = {
        './build/testing/FSS/resources/3rdparty/**/*.js': ['sourcemap']
    };
    if (!isDebug) {
        console.log('Running with reports at coverage/index.html\n');
        reports = [
            'spec',
            'live-html',
            'progress',
            'coverage-istanbul'
        ];

        plugins = [
            'karma-coverage',
            'karma-spec-reporter',
            'karma-html-live-reporter',
            'karma-coverage-istanbul-reporter'
        ];

        preprocessors['./app/**/*.js'] = ['coverage'];
    }

    let files = [
        'tests/jasmine/override.js',
    ];

    // Firebase JS to be served to application
    let firebase = getFileConfig([
        'manifest.json',
        './build/testing/FSS/resources/3rdparty/firebase/*.js',
        'firebase-config.json',
        'firebase-messaging-sw.js'
    ]);

    files = files.concat(firebase);
    // Include all js source files
    files.push(
        {
            pattern: 'ext/build/ext-modern-all-debug.js',
            included: true,
            served: true,
            watched: false
        },
        {
            pattern: 'app/**/*.js',
            watched: true,
            included: true,
            served: true,
            nocache: false
        },
        {
            pattern: 'overrides/**/*.js',
            watched: true,
            included: true,
            served: true,
            nocache: false
        },
        {
            pattern: 'tests/app.js',
            included: true,
            served: true,
            watched: false
        }
    );

    // Include all tests, should be done via regex to collect all tests
    let test = './tests/unit/FSS/**/*.spec.js'; // NOTE: this will map all test files

    if (process.env.KARMA_TEST !== 'false' && process.env.KARMA_TEST !== undefined) { // If there is only one file
        let file = process.env.KARMA_TEST.toString();
        let className = file.split('unit')[1].replace('.spec.js', '').replace('/', '').replace(new RegExp('/', 'g'), '.');
        console.log('SINGLE TEST MODE ', className);
        test = [process.env.KARMA_TEST];
    }
    files.push(test);

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine'],

        // start these browsers
        // available browser launchers: Chrome, ChromeHeadless
        browsers: browsers,

        // web server port
        port: 9876,

        // Files to be included in testing
        files: files,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // will cancel the current run and start a new run immediately when a change is detected
        restartOnFileChange: false,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: !isDebug,

        // Browser re-try test if browser fails
        retryLimit: 0,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // account for the amount of time the application takes to load
        // larger applications and development builds require more time
        browserNoActivityTimeout: 5000,

        // list of files / patterns to exclude
        exclude: [
            'app.js',
            'build/temp/!*',
            'build/production/!*',
            'build/development/!*',
            'node_modules/!*',
            'cordova/!*'
        ],

        // proxy mapper list, these files are served via karma server
        // so we need to user proxy here to redirect them cause they are relative to karma base url
        proxies: {
            '/app.js': '/base/tests/app.js',

            '/app': '/base/app',
            '/build': '/base/build',
            '/ext': '/base/ext',
            '/overrides': '/base/overrides',
            '/packages': '/base/packages',
            '/resources': '/base/resources',
            '/tests': '/base/tests'
        },

        // preprocessor matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: preprocessors,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: reports,

        // Karma plugins
        // only plugins in this list will be required by karma
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-sourcemap-loader'
        ].concat(plugins),

        // Spec reporter config
        specReporter: {
            maxLogLines: 5,                 // limit number of lines logged per test
            suppressErrorSummary: true,     // do not print error summary
            suppressFailed: false,          // do not print information about failed tests
            suppressPassed: false,          // do not print information about passed tests
            suppressSkipped: false,         // do not print information about skipped tests
            showSpecTiming: false,          // print the time elapsed for each spec
            failFast: false,                // test would finish with error when a first fail occurs.
            useColors: true
        },

        // html live reporter config
        htmlLiveReporter: {
            colorScheme: 'jasmine',
            defaultTab: 'summary', // 'summary' or 'failures' tab to start with

            // only show one suite and fail log at a time, with keyboard navigation
            focusMode: false
        },

        // karma coverage reporter config
        coverageIstanbulReporter: {
            // Include all source files eg app/**
            includeAllSources: true,

            // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
            reports: ['html', 'lcovonly', 'text-summary'],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: 'coverage',

            // Combines coverage information from multiple browsers into one report rather than outputting a report
            // for each browser.
            combineBrowserReports: true,

            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: true,

            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            skipFilesWithNoCoverage: true,

            verbose: isDebug // output config used by istanbul for debugging
        }
    });
};