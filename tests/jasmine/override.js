// jasmine interceptors and matchers
console.log('Live browser tests at http://localhost:5060');
console.log('Live browser console at http://localhost:9876/');

let getSuperType = function (argument) {
    var supertype = argument.$className;

    if (!supertype && argument.superclass) {
        supertype = getSuperType(argument.superclass);
    }
    if (!supertype) {
        supertype = typeof argument;
    }

    return supertype;
};

let matchers = {
    // test passed params
    toMatchExpectedParams: function () {
        return {
            compare: function (fn, controller) {
                spyOn(controller, fn).and.callFake(function () {
                    let mocks = controller.self.mocks;

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
                                    if (!args.hasOwnProperty(arg)) {
                                        throw 'argument `' + argument + '` is passed but it is not mocked';
                                    }
                                    else {
                                        let type = getSuperType(argument);
                                        expect(type).toBe(args[arg]);
                                    }
                                }

                                if (args.hasOwnProperty(arg)) {
                                    if (!arguments.hasOwnProperty(arg)) {
                                        throw 'argument `' + args[arg] + '` is mocked but not passed as param';
                                    }
                                }
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
                let mocks = controller.self.mocks;
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
                            expectedResult.message = 'expected `' + result + '` to be of type ' + typeof mock.returns
                        }
                    }
                }

                return expectedResult;
            }
        }
    }
};