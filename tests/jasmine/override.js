// jasmine interceptors and matchers
console.log('Live browser tests at http://localhost:5060');
console.log('Live browser console at http://localhost:9876/');

let matchers = {
    // test passed params
    toMatchExpectedParams: function () {
        return {
            compare: function (fn, controller) {
                spyOn(controller, fn).and.callFake(function () {
                    let mocks = controller.mocks || controller.self.mocks;
                    var className = controller.$name ? controller.$name : controller.$className;
                    if (!mocks) {
                        throw 'class `' + className + '` is missing a mocks object';
                    }
                    else {
                        let mock = mocks[fn];
                        if (!mock) {
                            throw 'class `' + className + '` is missing a mock for fn ' + fn;
                        }
                        else {
                            let args = mock.args;
                            for (let arg in arguments) {
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
                                for (let arg in args) {
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
                }
            }
        }
    },

    // test result type
    toMatchExpectedResult: function () {
        return {
            compare: function (result, controller, fn) {
                let mocks = controller.mocks || controller.self.mocks;
                let expectedResult = {
                    pass: false
                };

                var className = controller.$name ? controller.$name : controller.$className;
                if (!mocks) {
                    expectedResult.message = 'class `' + className + '` is missing a mocks object';
                }
                else {
                    let mock = mocks[fn];
                    if (!mock) {
                        expectedResult.message = 'class `' + className + '` is missing a mock for fn ' + fn;
                    }
                    else {
                        let type = getSuperType(result);
                        expectedResult = {
                            pass: type === mock.returns
                        };

                        if (!expectedResult.pass) {
                            expectedResult.message = 'expected `' + result + '` to be of type ' + typeOfArg(mock.returns)
                        }
                    }
                }

                return expectedResult;
            }
        }
    },

    toBeOfType: function () {
        return {
            compare: function (actual, expected) {
                debugger;
                var isArrayExpected = expected.indexOf('[]') !== -1;
                if (isArrayExpected) {
                    var type = expected.substring(0, expected.length - 2);
                    expect(actual).toBeOfSameType(type);

                    return {
                        pass: true
                    };
                }
                else {
                    return {
                        pass: typeOfArg(actual) === expected
                    };
                }
            }
        };
    },

    toBeArray: function () {
        return {
            compare: function (actual) {
                var test = {
                    pass: isArray(actual)
                };
                if (!test.pass) {
                    test.message = 'expected Array but passed ' + typeOfArg(actual);
                }
                return test;
            }
        };
    },

    toBeOfSameType: function () {
        return {
            compare: function (actual, expected) {
                expect(actual).toBeArray();
                var test = {
                    pass: isArray(actual)
                };

                if (test.pass) {
                    if (actual.length) {
                        var index = 0;
                        while (index < actual.length) {
                            test.pass &= typeOfArg(actual[index]) === expected;
                            index++;
                        }

                        if (!test.pass) {
                            test.message = 'Not all Array items are same type, expected ' + expected;
                        }
                    }
                }

                return test;
            }
        };
    },

    toPass: function () {
        return {
            compare: function (fn, scope, args) {
                var test = {pass: true};
                var func = scope[fn];
                var isFn = isFunction(func);
                var exception;

                if (!func || !isFn) {
                    test.pass = false;
                    test.message = 'passed arg `' + fn + '` is not a function or is undefined';
                }
                else {
                    try {
                        func.apply(scope, args);
                    } catch (e) {
                        exception = e;
                    }

                    if (exception) {
                        test.pass = false;
                    }
                }

                var not = this.isNot ? "not " : "";
                if (!test.pass) {
                    test.message = 'Expected function `' + fn + '` ' + not + 'to throw but it threw - ' + exception.message;
                } else {
                    test.message = 'Expected function `' + fn + '` to throw an exception';
                }

                return test;
            }
        };
    }
};


let getSuperType = function (argument) {
    var supertype = argument.$className;

    if (!supertype && argument.superclass) {
        supertype = getSuperType(argument.superclass);
    }
    if (!supertype) {
        supertype = typeOfArg(argument);
    }

    return supertype;
};

var typeOfArg = function (arg) {
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

    if(!type){
        type = getSuperType(arg);
    }

    return type;
};

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