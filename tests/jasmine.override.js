// jasmine interceptors and matchers
console.log('Live browser tests at http://localhost:5060');

let matchers = {
    // test passed params
    toMatchExpectedParams: function(){
        return {
            compare: function(actualValue, controller){
                spyOn(controller, actualValue).and.callFake(function(){
                    let mock = controller.self.mocks[actualValue];
                    if (!mock) {
                        throw 'class ' + controller.$name + ' is missing a mock for fn ' + actualValue;
                    }
                    else {
                        let args = mock.args;
                        for (let arg in arguments) {
                            if (arguments.hasOwnProperty(arg)) {
                                if (!args.hasOwnProperty(arg)) {
                                    throw 'argument ' + arguments[arg] + ' is passed but it is not mocked';
                                }
                                else {
                                    expect(args[arg]).toBe(typeof arguments[arg]);
                                }
                            }
                            
                            if (args.hasOwnProperty(arg)) {
                                if (!arguments.hasOwnProperty(arg)) {
                                    throw 'argument ' + args[arg] + ' is mocked but not passed as param';
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
    toMatchExpectedResult: function(){
        return {
            compare: function(result, controller, fn){
                let mock = controller.self.mocks[fn];
                let expectedResult = {
                    pass: typeof result === mock.returns
                };
                
                if (!expectedResult.pass) {
                    expectedResult.message = 'expected ' + result + ' to be of type ' + typeof mock.returns
                }
                
                return expectedResult;
            }
        }
    }
};