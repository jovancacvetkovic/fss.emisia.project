/**
 * FSS logger util is color-coded console message
 * Intended for development only
 */
Ext.define('FSS.util.Logger', {
    singleton: true,

    /**
     * Logs color-coded console message; intended for development only
     * to be used in between debug directives.
     * @param {String} text to log
     */

    warn: function (text) {
        console.log('%cWARN: %s', 'color: #FF4500;', text);
    },

    error: function (text) {
        console.log('%cERROR: %s', 'color: #FF0000; background: #D9E6EE; padding: 2px;', text);
    },

    info: function (text) {
        console.log('%cINFO: %s', 'color: #000000', text);
    },

    infos: function () {
        this.printAll(arguments, 'info');
    },

    errors: function () {
        this.printAll(arguments, 'error');
    },

    print: function (arg, fn) {
        this[fn](arg);
    },

    printAll: function (args, fn) {
        var index = 0;
        while (index < args.length) {
            this.print(args[index], fn);
            index++;
        }
    },

    group: function (text, messages, collapsed) {
        console[collapsed ? 'groupCollapsed' : 'group']('%c%s', 'color: #000000; font-weight: bold;', text);

        if (messages && messages.length) {
            var index = 0;
            while (index < messages.length) {
                this.info(messages[index]);
                index++;
            }

            console.groupEnd();
        }
    },

    close: function () {
        console.groupEnd();
    },

    table: function (data, filter) {
        console.table(data, filter);
    },

    startTimer: function (timerId) {
        console.time(timerId || 'timer');
    },

    stopTimer: function (timerId) {
        console.timeEnd(timerId || 'timer');
    }

}, function (Cls) {
    window.Logger = FSS.util.Logger;

    Cls.mocks = {
        warn: {
            args: {
                0: 'string'
            }
        },
        error: {
            args: {
                0: 'string'
            }
        },
        info: {
            args: {
                0: 'string'
            }
        },
        infos: {
            args: {
                0: 'string[]'
            }
        },
        errors: {
            args: {
                0: 'string[]'
            }
        },
        print: {
            args: {
                0: 'string',
                1: 'string'
            }
        },
        printAll: {
            args: {
                0: 'string[]',
                1: 'string'
            }
        },
        group: {
            args: {
                0: 'string',
                1: 'string[]',
                2: 'boolean'
            }
        },
        close: {},
        startTimer: {
            args: {
                0: 'string'
            }
        },
        stopTimer: {
            args: {
                0: 'string'
            }
        }
    };
});