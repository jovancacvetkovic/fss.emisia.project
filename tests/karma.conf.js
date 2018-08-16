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
let isDebug = !!process.env['_INTELLIJ_KARMA_INTERNAL_PARAMETER_debug'];
let isCovered = !!process.env['_INTELLIJ_KARMA_INTERNAL_PARAMETER_coverage-temp-dir'];

console.log('\nDEBUG mode is', isDebug ? 'ON' : 'OFF');
let browsers = [isDebug ? 'Chrome' : 'ChromeHeadless'];

let preprocessors = {
    'resources/3rdparty/**/*.js': ['sourcemap'],
    'tests/data/**/*.mock.json': ['json_fixtures']
};

let reporters = [
    'spec',
    'progress'
];

let plugins = [
    'karma-chrome-launcher',
    'karma-jasmine',
    'karma-sourcemap-loader',
    'karma-spec-reporter',
    'karma-json-fixtures-preprocessor'
];

if (isCovered) {
    console.log('Running with code coverage at `tests/coverage/index.html`\n');
    reporters = reporters.concat(['coverage', 'coverage-istanbul']);
    plugins = plugins.concat([
        'karma-coverage',
        'karma-coverage-istanbul-reporter',
        'karma-jshint'
    ]);
    // model and type folders are excluded for test coverage reports
    preprocessors['app/!(model|type)/**/*.js'] = ['coverage', 'jshint'];
}

let files = [
    // add any file in jasmine folder eg. jasmine override or global mock
    'tests/jasmine/mock/**/*.js',
    'tests/jasmine/override/**/*.js'
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
    // load ExtJS
    getFileConfig('ext/build/ext-modern-all-debug.js', false, true, true, false),

    // load source JS
    getFileConfig('app/**/*.js', true, true, true, false),

    // load overrides JS
    getFileConfig('overrides/**/*.js', true, true, true, false),

    // load JSON fixtures
    'tests/data/**/*.mock.json',

    // load karma adapter and wait for Ext application to launch
    getFileConfig('tests/karma.loader.js', true, true, true, false),

    // load tests JS
    getFileConfig('tests/app.js', true, true, true, false)
);

// Include all tests, should be done via regex to collect all tests
let test = 'tests/unit/FSS/**/*.spec.js'; // NOTE: this will map all test files

if (process.env.KARMA_TEST !== 'false' && process.env.KARMA_TEST !== undefined) { // If there is only one file
    let file = process.env.KARMA_TEST.toString();
    let className = file.split('unit')[1].replace('.spec.js', '').replace('/', '').replace(new RegExp('/', 'g'), '.');
    console.log('SINGLE TEST MODE ', className);
    test = [getFileConfig(className, true, true, true, false)];
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
            // get test app.js instead of application app.js
            '/app.js': '/base/tests/app.js',
            '/firebase-config.json': '/base/firebase-config.json',

            // proxy all to karma server, karma root is `base/`
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

        // karma istanbul coverage reporter config
        coverageIstanbulReporter: {
            // reports coverage tools
            reports: ['html', 'text-summary'],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: 'tests/coverage',

            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            skipFilesWithNoCoverage: true,

            verbose: false // output config used by istanbul for debugging
        },

        // options to validate JS code with jsHint
        jshint: {
            options: {
                eqeqeq: true,   // must use `===`
                eqnull: true,   // must use `===` if compared with `null` or `undefined`
                curly: true,    // requires `{}` around while,for,if... blocks
                evil: true,     // suppresses eval warnings, ext mandatory
                maxdepth: 4,    // defines max nested blocks
                maxparams: 5,   // defines max params to be passed to a method
                newcap: false,  // suppresses mandatory use on `new` to create instances, ext is using `create`
                globals: {
                    cordova: true,
                    firebase: true,
                    Ext: true,
                    FSS: true,
                    Logger: true
                }
            },
            summary: true
        },

        // json fixtures config
        jsonFixturesPreprocessor: {
            stripPrefix: 'tests/data/',
            variableName: 'jsonMocks'
        }
    });
};