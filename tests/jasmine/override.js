// jasmine interceptors and matchers
console.log('Live browser tests at http://localhost:5060');
console.log('Live browser console at http://localhost:9876/');

var matchers = {
    // test passed params
    toMatchExpectedParams: function () {
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

                            if (!arguments.length) {
                                var length = 0;
                                var params = [];
                                for (var arg in args) {
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

    // test result type
    toMatchExpectedResult: function () {
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

    toBeOfType: function () {
        return {
            compare: function (actual, expected) {
                var isArrayExpected = expected.indexOf('[]') !== -1;
                if (isArrayExpected) {
                    var type = expected.substring(0, expected.length - 2);
                    expect(actual).toBeOfSameType(type);
                }
                else {
                    if (getSuperType(actual) !== expected) {
                        throw 'expected argument `' + getSuperType(actual) + '` to be of type `' + expected + '`';
                    }
                }

                return {
                    pass: true
                };
            }
        };
    },

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

    toPass: function () {
        return {
            compare: function (fn, scope, args) {
                var isValid = true;
                var func = scope[fn];
                var isFn = isFunction(func);
                var exception;

                if (!func || !isFn) {
                    throw 'expected passed arg `' + fn + '` to be `function` but `' + getSuperType(fn) + '` was passed';
                }
                else {
                    try {
                        func.apply(scope, args);
                    } catch (e) {
                        exception = e;
                        isValid = false;
                    }
                }

                var not = this.isNot ? "not " : "";
                if (!isValid) {
                    throw 'expected function `' + fn + '` ' + not + 'to throw but it threw - ' + exception.message;
                }

                return {
                    pass: true
                };
            }
        };
    }
};

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