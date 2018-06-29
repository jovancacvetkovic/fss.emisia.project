'use strict';

// File mapper fn
let getFileConfig = function (files, watched, included, served, nocache) {
    if (typeof files === 'string') {
        files = {
            pattern: files,
            watched: !!watched,
            included: !!included,
            served: !!served,
            nocache: !!nocache
        };
    }
    else {
        files = files.map(function (file) {
            return {
                pattern: file,
                watched: !!watched,
                included: !!included,
                served: !!served,
                nocache: !!nocache
            };
        });
    }

    return files;
};

// Set debugging via Chrome or run ChromeHeadless in intelliJ
let isDebug = !!process.env.DEBUG;
console.log('\nDEBUG mode is', isDebug ? 'ON' : 'OFF');
let browsers = [isDebug ? 'Chrome' : 'ChromeHeadless'];

let reporters = [];
let plugins = [];
let preprocessors = {
    'resources/3rdparty/**/*.js': ['sourcemap']
};
if (!isDebug) {
    console.log('Running with reporters at coverage/index.html\n');
    reporters = [
        'spec',
        'live-html',
        'progress',
        'coverage-istanbul',
        'progress',
        'coverage'
    ];

    plugins = [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-sourcemap-loader',
        'karma-coverage',
        'karma-spec-reporter',
        'karma-html-live-reporter',
        'karma-coverage-istanbul-reporter'
    ];

    preprocessors['app/**/*.js'] = ['coverage'];
}

let files = [
    'tests/jasmine/override.js',
];

// Firebase JS to be served to application
let firebase = getFileConfig([
    'manifest.json',
    'resources/3rdparty/firebase/*.js',
    'firebase-config.json',
    'firebase-messaging-sw.js'
], false, false, true, false);
files = files.concat(firebase);

// Include all js source files
files.push(
    getFileConfig('ext/build/ext-modern-all-debug.js', false, true, true, false),
    getFileConfig('app/**/*.js', true, true, true, false),
    getFileConfig('overrides/**/*.js', true, true, true, false),
    getFileConfig('tests/app.js', false, true, true, false)
);

// Include all tests, should be done via regex to collect all tests
let test = 'tests/unit/FSS/**/*.spec.js'; // NOTE: this will map all test files

if (process.env.KARMA_TEST !== 'false' && process.env.KARMA_TEST !== undefined) { // If there is only one file
    let file = process.env.KARMA_TEST.toString();
    let className = file.split('unit')[1].replace('.spec.js', '').replace('/', '').replace(new RegExp('/', 'g'), '.');
    console.log('SINGLE TEST MODE ', className);
    test = [process.env.KARMA_TEST];
}
files.push(test);

module.exports = function (config) {
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
        logLevel: config.LOG_DISABLE,

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
        reporters: reporters,

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

        // karma istanbul coverage reporter config
        coverageIstanbulReporter: {
            // Include all source files eg app/**
            includeAllSources: true,

            // reports coverage tools
            reports: ['html', 'text-summary'],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: 'tests/coverage',

            // Combines coverage information from multiple browsers into one report rather than outputting a report
            // for each browser.
            combineBrowserReports: false,

            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: false,

            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            skipFilesWithNoCoverage: true,

            verbose: false // output config used by istanbul for debugging
        }
    });
};