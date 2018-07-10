// jasmine interceptors and matchers
console.log('Live browser tests at http://localhost:5060');
console.log('Live browser console at http://localhost:9876/');

// noinspection JSUnusedLocalSymbols
var matchers = {
    /**
     * Test passed arguments to be of expected type
     * @param {*} controller
     * @returns {{compare: (function(*=, *=): {pass: boolean})}}
     */
    toMatchExpectedParams: function (controller) {
        return {
            compare: function (fn, controller) {
                spyOn(controller, fn).and.callFake(function () {
                    var mocks = controller.mocks || controller.self.mocks;
                    var className = controller.$name ? controller.$name : controller.$className;
                    if (!mocks) {
                        throw 'class `' + className + '` is missing a mocks object';
                    }
                    else {
                        var mock = mocks[fn];
                        if (!mock) {
                            throw 'class `' + className + '` is missing a mock for fn ' + fn;
                        }
                        else {
                            var args = mock.args;
                            for (var arg in arguments) {
                                if (arguments.hasOwnProperty(arg)) {
                                    var argument = arguments[arg];
                                    if (!args || !args.hasOwnProperty(arg)) {
                                        throw 'argument `' + argument + '` is passed but it is not mocked';
                                    }
                                    else {
                                        // test argument type
                                        expect(argument).toBeOfType(args[arg]);
                                    }
                                }

                                // noinspection JSUnfilteredForInLoop
                                if (args && args.hasOwnProperty(arg)) {
                                    if (!arguments.hasOwnProperty(arg)) {
                                        throw 'argument `' + args[arg] + '` is mocked but not passed as param';
                                    }
                                }
                            }

                            if (!arguments.length) { // test number of passed arguments
                                var length = 0;
                                var params = [];
                                for (arg in args) {
                                    if (args.hasOwnProperty(arg)) {
                                        params.push(args[arg]);
                                        length++;
                                    }
                                }
                                throw 'no arguments passed but method expected `' + length + '` params: ``' + params.join(' & ') + '``';
                            }
                        }
                    }
                });

                return {
                    pass: true
                };
            }
        }
    },

    /**
     * Test function return value be of expected type
     * @param {*} controller
     * @param {string} fn
     * @returns {{compare: (function(*=, *, *): {pass: boolean})}}
     */
    toMatchExpectedResult: function (controller, fn) {
        return {
            compare: function (result, controller, fn) {
                var mocks = controller.mocks || controller.self.mocks;
                var className = controller.$name ? controller.$name : controller.$className;
                if (!mocks) {
                    throw 'class `' + className + '` is missing a mocks object';
                }
                else {
                    var mock = mocks[fn];
                    if (!mock) {
                        throw 'class `' + className + '` is missing a mock for fn ' + fn;
                    }
                    else {
                        expect(result).toBeOfType(mock.returns);
                    }
                }

                return {
                    pass: true
                };
            }
        }
    },

    /**
     * Test argument type to of proper type
     * @param {*} expected
     * @returns {{compare: (function(*=, *): {pass: boolean})}}
     */
    toBeOfType: function (expected) {
        return {
            compare: function (actual, expected) {
                var isArrayExpected = expected.indexOf('[]') !== -1;
                if (isArrayExpected) {
                    var type = expected.substring(0, expected.length - 2);
                    expect(actual).toBeOfSameType(type); // if its array, test array items
                }
                else {
                    var index = 0;
                    var isExpected = false;
                    var allExpectancies = expected.split('|'); // result can be passed as a list of return types
                    var superType = actual && getSuperType(actual) || getTypeOf(actual);
                    while (!isExpected && index < allExpectancies.length) {
                        isExpected = superType === allExpectancies[index]; // examine all return type, if any matches
                        index++;
                    }
                    if (!isExpected) {
                        throw 'expected argument `' + superType + '` to be of type `' + expected + '`';
                    }
                }

                return {
                    pass: true
                };
            }
        };
    },

    /**
     * Test argument to be of type `array`
     * @returns {{compare: (function(*=): {pass: boolean})}}
     */
    toBeArray: function () {
        return {
            compare: function (actual) {
                if (!isArray(actual)) {
                    throw 'expected Array but passed ' + getSuperType(actual);
                }

                return {
                    pass: true
                };
            }
        };
    },

    /**
     * Test array items to be of proper type
     * @returns {{compare: (function(*=, *=): {pass: boolean})}}
     */
    toBeOfSameType: function () {
        return {
            compare: function (actual, expected) {
                expect(actual).toBeArray();

                if (isArray(actual)) {
                    if (actual.length) {
                        var isValid = true;
                        var index = 0;
                        while (isValid && index < actual.length) {
                            isValid = (getSuperType(actual[index]) === expected);
                            if (!isValid) {
                                toHaveSameMembers(actual[index], expected);
                            }

                            index++;
                        }
                    }
                }

                return {
                    pass: true
                };
            }
        };
    },

    /**
     * Test method call to pass
     * @param {*} scope
     * @param {array} args
     * @returns {{compare: (function(*=, *=, *=): {pass: boolean})}}
     */
    toPass: function (scope, args) {
        return {
            compare: function (fn, scope, args) {
                var isValid = true;
                var func = scope[fn];
                var isFn = isFunction(func);
                var exception;

                if (!func || !isFn) {
                    // expected argument is function
                    throw 'expected passed arg `' + fn + '` to be `function` but `' + getSuperType(fn) + '` was passed';
                }
                else {
                    try {
                        // try to execute function
                        func.apply(scope, args);
                    } catch (e) {
                        exception = e;
                        isValid = false; // if function call fails test case will fail
                    }
                }

                var not = !this.isNot ? "not " : "";
                if (!isValid) {
                    throw 'expected function `' + fn + '` ' + not + 'to throw but it threw - ' + exception.message + ' \nCall Stack: ' + exception.stack;
                }

                return {
                    pass: true
                };
            }
        };
    }
};

// add matchers to jasmine
beforeEach(function () {
    jasmine.addMatchers(matchers);
});

/**
 * Test object members if type is `object` or object instance
 * @param {*} actual
 * @param {*} expected
 * @returns {boolean}
 */
var toHaveSameMembers = function (actual, expected) {
    var isValid = true;
    if (isObject(actual)) {
        var originalExpected = expected;
        if (isString(expected)) {
            // make this available as real class/type definition
            expected = eval(expected);
        }

        var configs = expected.$config ? expected.$config.configs : {};

        for (var arg in actual) {
            if (actual.hasOwnProperty(arg)) {
                isValid &= configs.hasOwnProperty(arg);

                if (!isValid) {
                    break;
                }
            }
        }

        if (!isValid) {
            throw 'expected to have `' + arg + '` but it did not match any member from ' + originalExpected;
        }
    }
    else {
        isValid = false;
        throw 'expected passed argument to be an object';
    }

    return isValid;
};

/**
 * Returns argument type, variable type or class/type name
 * @param {*} argument
 * @returns {string}
 */
var getSuperType = function (argument) {
    var supertype = argument.$className;

    if (!supertype && argument.superclass) {
        // If this is Ext class/type try and find its classname as type
        supertype = getSuperType(argument.superclass);
    }

    if (!supertype) {
        // If none above returned type then try to find a native JS type
        supertype = getTypeOf(argument);
    }

    return supertype;
};

/**
 * Returns atom variable type
 * @param {*} arg
 * @returns {string}
 */
var getTypeOf = function (arg) {
    var type;

    if (isObject(arg)) {
        type = 'object';
    }
    if (isString(arg)) {
        type = 'string';
    }
    if (isArray(arg)) {
        type = 'array';
    }
    if (isNumber(arg)) {
        type = 'number';
    }
    if (isNull(arg)) {
        type = 'null';
    }
    if (isDate(arg)) {
        type = 'date';
    }
    if (isRegExp(arg)) {
        type = 'regexp';
    }
    if (isFunction(arg)) {
        type = 'function';
    }
    if (isBoolean(arg)) {
        type = 'boolean';
    }
    if (isSymbol(arg)) {
        type = 'symbol';
    }
    if (isError(arg)) {
        type = 'error';
    }
    if (isUndefined(arg)) {
        type = 'undefined';
    }

    if (!type) {
        // If all types fail then fallback to native typeof method
        type = typeof arg;
    }

    return type;
};

// List of all wrapped data types for testing purposes

var isString = function (value) {
    return typeof value === 'string' || value instanceof String;
};

var isNumber = function (value) {
    return typeof value === 'number' && isFinite(value);
};

var isArray = function (value) {
    return value && typeof value === 'object' && value.constructor === Array;
};

var isFunction = function (value) {
    return typeof value === 'function';
};

var isObject = function (value) {
    return value && typeof value === 'object' && value.constructor === Object;
};

var isNull = function (value) {
    return value === null;
};

var isUndefined = function (value) {
    return typeof value === 'undefined';
};
var isBoolean = function (value) {
    return typeof value === 'boolean';
};

var isRegExp = function (value) {
    return value && typeof value === 'object' && value.constructor === RegExp;
};

var isError = function (value) {
    return value instanceof Error && typeof value.message !== 'undefined';
};

var isDate = function (value) {
    return value instanceof Date;
};

var isSymbol = function (value) {
    return typeof value === 'symbol';
};