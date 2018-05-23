/**
 * WebUI Abstract Unit test
 *
 * Defines common behaviour for UI unit tests
 *
 * @author Zeljko Mitrovic
 */
Ext.define('TEST.Abstract', {
    requires: [
        'Ext.layout.container.Fit',
        'Ext.window.Window',
        'TEST.Ajax'
    ],

    /**
     * @property {Object} appAjaxData Placeholder for all JSON-s test will need
     */
    appAjaxData: {},

    /**
     * @property {Object} appCavaConfig Cava config
     */
    appCavaConfig: {
        /**
         * @property {Object} Request headers
         */
        headers: {
            /**
             * @property {String} Authorization
             */
            Authorization: 'token',
            /**
             * @property {String} Account-Info
             */
            'Account-Info': 'token'
        },
        /**
         * @property {String} App version
         */
        version: '1.2.0_RC1-SNAPSHOT',
        /**
         * @property {Object} Object containing cava URL-s
         */
        endpoints: {
            /**
             * @property {String} Request validation url
             */
            validateRequest: 'http://cava.emisia.lan/validateRequest.cava',
            /**
             * @property {String} Response validation url
             */
            validateResponse: 'http://cava.emisia.lan/validateResponse.cava'
        }
    },

    /**
     * @property {String} appClassName Class name sans Namespace
     */
    appClassName: '',

    /**
     * @property {Object} appCalledInterceptedMethods Object used for flagging called parent methods
     */
    appCalledInterceptedMethods: undefined,

    /**
     * @property {String[]} appControllerMockedProperties Array containing names of all controller methods and properties which are mocked, meaning parent mocks, this class mocks and mixins mocks. It is used in spyOwnMethodsAndRedirectToMock
     */
    appControllerMockedProperties: [],

    /**
     * @property {Int} appAjaxRequestsCount number of endpoints from ajax data - this is for cava response validation
     */
    appAjaxRequestsCount: 0,

    /**
     * @property {String} appErrorStatus storing cava response validation errors if they exist
     */
    appErrorStatus: '',

    /**
     * @property {String} appFullClassNameApplication class name
     */
    appFullClassName: '',

    /**
     * @private
     * @property {String[]} appMethodsToIntercept Array containing list of parent class methods methods that must be tested in child. It is automatically populated
     */
    appMethodsToIntercept: [],

    /**
     * @property {Boolean} appInvalidRequestsCounter Counter of non-valid requests
     */
    appInvalidRequestsCounter: 0,

    /**
     * @property {String[]} appMethodsToTestInChildTest Array containing list of methods that must be tested in child class too
     */
    appMethodsToTestInChildTest: [],

    /**
     * @property {String[]} appMockedProperties Array containing names of all methods and properties which are mocked, meaning parent mocks, this class mocks and mixins mocks. It is used in spyOwnMethodsAndRedirectToMock
     */
    appMockedProperties: [],

    /**
     * @property {Object} appMocks Object containing mocks
     */
    appMocks: {},

    /**
     * @property {Object} appMockObj Object used to redirect self methods spies to
     */
    appMockObj: undefined,

    /**
     * @property {String[]} appNoMocks Array containing list of properties to skip mocking
     */
    appNoMocks: [],

    /**
     * @property {Boolean} appPreventObjectCreation Flag used to prevent test object creation
     */
    appPreventObjectCreation: false,

    /**
     * @property {Object} appTestObj Object used to perform all tests on
     */
    appTestObj: undefined,

    /**
     * @property {String} appTestClassName test class name
     */
    appTestClassName: '',

    /**
     * @property {Boolean} appTestWillHandleObj Flag to allow individual test to create test obj using selfCreateTestObject
     */
    appTestWillHandleObj: false,

    /**
     * Based on test class name tries to syncRequire class that should be tested and instantiate it. If successful calls other tests defined in child class
     *
     * It also initiate acquiring of all JSON files need for the test
     */
    constructor: function(){
        var testName = Ext.ClassManager.getName(this);
        this.appFullClassName = this.appTestClassName || testName.slice(5);
        try {
            //noinspection JSValidateTypes
            Ext.syncRequire(this.appFullClassName);
        }
        catch (e) {
            console.log('Unable to retrieve ' + this.appFullClassName);
        }

        this.appCalledInterceptedMethods = {};
    },

    /**
     * Updates tested class passed initObj with parent methods and properties mocks and returns that object
     *
     * @param {Ext.Component} initObj
     * @param {TEST.Abstract} parentScope Test instance to be used for parent mocks scope. This is needed when resolving appTestObj in parent mocks - mvidojevic
     *
     * @returns {Ext.Component} initObj
     */
    addParentMocks: function(initObj, parentScope){
        var parentClassName = this.getParentClassName();
        if (this.isCustomAppNameSpace(parentClassName.split('.')[0])) {
            var parentMock = this.createParentMockObj(parentClassName, initObj, parentScope);
            var methodsMap = TEST.mapForUnitTests[parentClassName];
            for (var property in methodsMap) {
                if (methodsMap.hasOwnProperty(property)) {
                    initObj[property] = parentMock[property];
                }
            }
        }

        return initObj;
    },

    /**
     * Adds all tests
     */
    addTests: function(){
        var me = this;

        var fullClassName = me.appFullClassName;
        var evalClassName;
        try {
            evalClassName = eval(fullClassName);
        }
        catch (e) {
        }

        if (!evalClassName.prototype.isViewController) {
            describe(fullClassName + ' - Test', function(){
                describe('Geting Ajax Data', function(){

                    it("Ajax called", function(done){
                        Ext.Ajax.request({
                            url: 'data/' + me.appFullClassName.replace(/\./g, '/') + '.json',
                            scope: me,
                            callback: function(options, success, response){
                                this.appAjaxData = Ext.decode(response.responseText, true);
                                if (this.appAjaxData && this.appAjaxData.endpoints) {
                                    this.setEndPoints();
                                }
                                done();
                            }
                        });
                    });

                    it("Cava response - Ajax called", function(done){
                        if (me.appAjaxData && me.appAjaxData.endpoints) {
                            var endpoints = me.appAjaxData.endpoints;
                            me.appAjaxRequestsCount = me.appAjaxData.endpoints.length;
                            var item = 0;
                            var endpoint;
                            while (item < me.appAjaxRequestsCount) {
                                endpoint = endpoints[item];
                                Ext.Ajax.request({
                                    url: me.appCavaConfig.endpoints.validateResponse,
                                    jsonData: {
                                        app: endpoint.app,
                                        body: JSON.stringify(endpoint.body),
                                        headers: {},
                                        method: 'POST',
                                        path: endpoint.path,
                                        responseStatus: 200,
                                        version: me.appCavaConfig.version
                                    },
                                    scope: me,
                                    success: Ext.bind(me.responseHandler, me, [done], true)
                                });
                                item++;
                            }
                        }
                        else {
                            done();
                        }
                    });

                    it('Cava response - Validation', function(){
                        expect(me.appErrorStatus).toEqual('');
                    });
                });

                me.runInitializationTest(evalClassName, fullClassName);

                if (evalClassName) {
                    describe('Creating Test object mockup', function(){
                        it('Mockup object created', function(){
                            spyOn(Ext.Ajax, 'request');
                            me.appMockObj = me.createMockObj();
                        });
                    });

                    describe('Mocking up child components', function(){
                        it('Child components mocked successfully', function(){
                            spyOn(Ext.Ajax, 'request');
                            me.mockChildComponents(me.appTestObj);
                        });
                    });

                    describe('Intercepting parent methods that should be tested in child class', function(){
                        it('Interception successful', function(){
                            me.interceptRequiredMethods();
                        });
                    });

                    me.runTests();

                    describe('Checking if all intercepting parent methods have been tested', function(){
                        it('All intercepted methods called', function(){
                            me.checkTestedInterceptedMethods();
                        });
                    });
                }
            });
        }
    },

    /**
     * Checks if all methods that are required to be tested by parent class are called
     */
    checkTestedInterceptedMethods: function(){
        var methods = this.appMethodsToIntercept;
        var item = methods.length;
        var notIntercepted = [];
        var current;
        while (item) {
            item--;
            current = methods[item];
            if (!this.appCalledInterceptedMethods[current]) {
                notIntercepted.push(current);
            }
        }

        if (notIntercepted.length) {
            console.error('Some methods that are required by parent class to be tested in child class have not been tested. Please write tests for following methods: ' + notIntercepted.join(', '));
            throw '';
        }
    },
    /**
     * Cheks if given url is listed in json file of the class you testing
     *
     * @param {String} url
     * @return {Boolean} true if contains
     */
    checkThisRequestUrl: function(url){
        var contains = false;
        if (url) {
            var endpoints = this.appAjaxData.endpoints;
            var item = endpoints.length;

            while (!contains && item) {
                --item;
                contains = endpoints[item].path === url;
            }
        }
        return contains;
    },
    /**
     * Checks if the request is valid
     *
     * @param {Object} data Request params
     * @param {Function} done
     */
    checkThisCava: function(data, done){
        var url = data.url;
        if (this.checkThisRequestUrl(url)) {
            this.appInvalidRequestsCounter++;
            var cavaCfg = this.appCavaConfig;
            var app = this.getApplicationName(url);
            var params = data.params;
            var method = data.method;
            if (!method && params) {
                method = 'POST'
            }
            TEST.Ajax.request({
                params: {
                    method: method,
                    path: url,
                    headers: cavaCfg.headers,
                    body: JSON.stringify(params),
                    app: app,
                    version: cavaCfg.version
                },
                scope: this,
                success: Ext.bind(this.validateRequest, this, [done], true),
                failure: Ext.bind(this.requestValidationFailure, this, [done], true),
                url: cavaCfg.endpoints.validateRequest
            });
        }
        else {
            console.warn('Test attempted to send the request to the URL that is not listed in JSON file');
        }
    },

    /**
     * Returns object which contains mocked view controller functions
     * @param {Ext.Component} objPrototype
     * @return {Object}
     */
    collectViewControllerMocks: function(objPrototype){
        var mockCfg = {};
        var name = Ext.getClassName(objPrototype);
        if (name !== 'Ext.app.ViewController') {
            var testCls = Ext.syncRequire('TEST.' + name);
            if (!testCls) {
                console.log('Missing test for ' + name + ' ViewController. Write ViewController test first');
                throw '';
            }
            else {
                Ext.applyIf(mockCfg, testCls.appMocks);
                var parentMocks = this.collectViewControllerMocks(objPrototype.superclass);
                Ext.applyIf(mockCfg, parentMocks);
            }
        }
        return mockCfg;
    },

    /**
     * Creates mock object by mocking all methods and apllying inherited methods from parent class
     *
     * @param {Object} [childInitObj] When using multiple inheritance we need to pass starting test child reference so we can apply all parents mocks to this object
     * @param {TEST.Abstract} [parentScope] Test instance to be used for parent mocks scope. This is needed when resolving appTestObj in parent mocks - mvidojevic
     *
     * @returns {Object} Mock object
     */
    createMockObj: function(childInitObj, parentScope){
        var obj = Ext.ClassManager.get(this.appFullClassName);
        var objPrototype = obj.prototype;
        if (objPrototype.mixins) {
            this.syncMixinsMocks(objPrototype.mixins);
        }
        this.notifyIfObsoleteMocksExist(objPrototype);
        var scopeForParentMocks = parentScope ? parentScope : this;

        var initObj = childInitObj ? childInitObj : this.instantiateTestedClass();
        var mockObj = this.mockMethodsAndProperties(objPrototype, scopeForParentMocks);

        var viewController = initObj.getController();
        if (viewController) {
            var viewControllerObj = Ext.ClassManager.get(Ext.getClassName(viewController));
            var viewControllerPrototype = viewControllerObj.prototype;
            var mockController = this.mockMethodsAndProperties(viewControllerPrototype, scopeForParentMocks);
            Ext.apply(viewController, mockController);
        }

        initObj = this.addParentMocks(initObj, scopeForParentMocks);
        mockObj = Ext.apply(initObj, mockObj);

        return mockObj;
    },

    /**
     * Creates mock of parent class to provide mock methods that are inherited from it
     *
     * @param {String} parentClassName Testes class extended parent name
     * @param {Object} [childInitObj] When using multiple inheritance we need to pass starting test child reference so we can apply all parents mocks to this object
     * @param {TEST.Abstract} parentScope Test instance to be used for parent mocks scope. This is needed when resolving appTestObj in parent mocks - mvidojevic
     *
     * @returns {Object} Parent class object mock
     */
    createParentMockObj: function(parentClassName, childInitObj, parentScope){
        var parentTest = this.getParentClassTest(parentClassName);
        var parentMock = parentTest ? parentTest.createMockObj(childInitObj, parentScope) : Ext.create(parentClassName, this.getClassInitObject());

        return parentMock;
    },

    /**
     * Calls jasmine done when each request from method you testing is validated
     *
     * @param {Function} done
     * @param {Boolean} force
     */
    doneTesting: function(done, force){
        if (!this.appInvalidRequestsCounter || force) {
            done();
        }
    },

    /**
     * The selection function to execute for each array item. Finds given url in array of endpoints.
     *
     * @param {String} item
     * @param {String} url
     * @return {boolean} True if the given url is equal to endpoint path
     */
    findUrl: function(item, url){
        return item.path === url;
    },

    /**
     * Get application name for given request path
     *
     * @param {String} url
     * @return {String} Application name
     */
    getApplicationName: function(url){
        var endpoints = this.appAjaxData.endpoints;
        var endpoint = Ext.Array.findBy(endpoints, Ext.bind(this.findUrl, this, [url], 1));
        return endpoint ? endpoint.app : endpoint;
    },

    /**
     * Gets object needed for tested class initialisation.
     *
     * Child classes should override this method if necessary and return appropriate property of this.appAjaxData.
     */
    getClassInitObject: function(){
        return {
            p_data: {}
        }
    },

    /**
     * Returns array containing all functions or methods from the mixin which have not been mocked or an empty array if all are mocked
     *
     * @param {Object} mockableMixinProperties Object where each property is a name of a custom property or a method which can be mocked
     * @param {Object} appMocks Object containing mixin mocked properties
     *
     * @returns {String[]} missingMocks Names of the mixin properties which are not mocked
     */
    getMissingMixinMocks: function(mockableMixinProperties, appMocks){
        var missingMocks = [];
        for (var property in mockableMixinProperties) {
            if (mockableMixinProperties.hasOwnProperty(property) && !appMocks.hasOwnProperty(property)) {
                missingMocks.push(property);
            }
        }

        return missingMocks;
    },

    /**
     * Returns an object where each property is a mockable property from the passed mixin
     *
     * @param {Object} mixinTest Mixin test
     * @param {Object} mapForUnitTests Contains all custom property from the mixin
     *
     * @returns {Object} mockableProperties Only custom properties which can be mocked
     */
    getMockableMixinProperties: function(mixinTest, mapForUnitTests){
        var mockableProperties = {};
        if (!mixinTest.appNoMocks || !mixinTest.appNoMocks.length) {
            mockableProperties = mapForUnitTests;
        }
        else {
            for (var property in mapForUnitTests) {
                if (mapForUnitTests.hasOwnProperty(property)) {
                    if (!Ext.Array.contains(mixinTest.appNoMocks, property)) {
                        mockableProperties[property] = true;
                    }
                }
            }
        }

        return mockableProperties;
    },

    /**
     * Tests that need to create test obj specifically need to override this method and return correct object for destruction
     */
    getObjectToDestroy: function(){
        throw 'Abstract method call';
    },

    /**
     * Returns an array of function names which are mocked in the test but no longer exist in the tested class. If no obsolete functions returns an empty array
     *
     * @param {Object} objPrototype
     *
     * @returns {String[]} obsoleteMocks
     */
    getObsoleteMocks: function(objPrototype){
        var obsoleteMocks = [];
        for (var mock in this.appMocks) {
            if (this.appMocks.hasOwnProperty(mock) && !objPrototype.hasOwnProperty(mock) && this.isObsoleteInParent(mock)) {
                obsoleteMocks.push(mock);
            }
        }

        return obsoleteMocks;
    },

    /**
     * Retrieves parent class name
     *
     * @returns {String} Parent class name
     */
    getParentClassName: function(){
        var mainClass = Ext.ClassManager.get(this.appFullClassName);
        var parentClass = mainClass.superclass;

        var parentClassName = Ext.ClassManager.getName(parentClass);

        return parentClassName;
    },

    /**
     * Retrieves test for parent class if it exists and parent class is CustomApp class
     *
     * @param {String} parentClassName
     *
     * @returns {TEST.Abstract} Test for parent class
     */
    getParentClassTest: function(parentClassName){
        var parentTest;
        if (this.isCustomAppNameSpace(parentClassName.split('.')[0])) {
            var parentTestName = 'TEST.' + parentClassName;
            //noinspection JSValidateTypes
            parentTest = Ext.syncRequire(parentTestName);
            if (!parentTest) {
                console.error('Parent test missing. Please write test for ' + parentClassName + ' first.');
                throw '';
            }
        }

        return parentTest;
    },

    /**
     * Drags mixin mocks and also mixin parent mocks if mixin parent is CustomApp component
     *
     * @param {Object} mixin
     */
    handleMixinMockSync: function(mixin){
        //noinspection JSValidateTypes
        var className = Ext.getClassName(mixin);
        this.tryToUpdateMocksIfCustomAppMixin(className);//Mixins can be either an array or an object but javascript treats both as an object type
        var parentClassName = Ext.getClassName(mixin.superclass);
        if (this.isCustomAppNameSpace(parentClassName.split('.')[0])) {
            var parentClass = Ext.syncRequire(parentClassName);
            this.handleMixinMockSync(parentClass);
        }
    },

    /**
     * Returns instantiated class object
     *
     * @returns {Ext.Component} initObj
     */
    instantiateTestedClass: function(){
        var initObj;
        if (this.appTestWillHandleObj) {
            initObj = this.selfCreateTestObject();
        }
        else {
            initObj = Ext.create(this.appFullClassName, this.getClassInitObject(this));
        }

        return initObj;
    },

    /**
     * Intercepting parent methods that should be tested in child class
     */
    interceptRequiredMethods: function(){
        var parentClassName = this.getParentClassName();
        var parentTest = this.getParentClassTest(parentClassName);

        if (parentTest) {
            var methods = parentTest.appMethodsToTestInChildTest;
            var item = methods.length;
            var currentMethodName;
            var currentMethod;
            while (item) {
                item--;
                currentMethodName = methods[item];
                currentMethod = this.appTestObj[currentMethodName];
                if (!currentMethod) {
                    console.error('Parent requested testing of nonexistent method: ' + currentMethodName);
                    throw '';
                }
                else {
                    //noinspection JSValidateTypes
                    this.appTestObj[currentMethodName] = Ext.Function.createInterceptor(currentMethod, Ext.bind(this.interceptorMethod, this, [currentMethodName]), this.appTestObj);
                }
            }

            this.appMethodsToIntercept = Ext.clone(methods);
        }
    },

    /**
     * Fills in appCalledInterceptedMethods object to flag called methods
     *
     * @param {String} methodName Called method name
     */
    interceptorMethod: function(methodName){
        this.appCalledInterceptedMethods[methodName] = true;
    },

    /**
     * Returns true if property is CustomApp custom, false if ExtJs
     *
     * @param {String} property
     *
     * @returns {Boolean} isCustomProperty
     */
    isCustomProperty: function(property){
        var isCustomProperty = property.slice(0, 2) === 'p_' || property.slice(0, 3) === 'app';

        return isCustomProperty;
    },

    /**
     * Checks if namespace is CustomApp app
     *
     * @param {String} nameSpace Class namespace
     *
     * @returns {Boolean} Returns true if class is in CustomApp namespace and false instead
     */
    isCustomAppNameSpace: function(nameSpace){
        return Ext.Array.contains(['FW'], nameSpace);
    },

    /**
     * Returns true if any parent class in inheritance chain has this function, false otherwise
     *
     * @param {String} mock Function to mock name
     *
     * @returns {Boolean} obsoleteInParent
     */
    isObsoleteInParent: function(mock){
        var obsoleteInParent = false;
        var parentClassName = this.getParentClassName();
        if (this.isCustomAppNameSpace(parentClassName.split('.')[0])) {
            var properties = TEST.mapForUnitTests[parentClassName];
            obsoleteInParent = !properties[mock];
            if (obsoleteInParent) {
                var parentTest = this.getParentClassTest(parentClassName);
                obsoleteInParent = parentTest.isObsoleteInParent(mock);
            }
        }

        return obsoleteInParent;
    },
    /**
     * Method used to mock object methods. Checks for validity of number and arguments type. Optionally returns mocked value
     *
     * @returns {Mixed} Optional mocked return value
     */
    methodMock: function(mockCfg){
        var calledArgsLen = arguments.length - 1;
        var methodCfg = arguments[calledArgsLen];
        var expectedArgsLength = methodCfg.args.length;

        if (expectedArgsLength < calledArgsLen) {
            throw 'Method ' + methodCfg.name + ' called with more params then expected. Expected: ' + expectedArgsLength + ' Called:' + calledArgsLen;
        }

        var mandatoryParams = 0;
        while (expectedArgsLength) {
            expectedArgsLength--;
            if (!methodCfg.args[expectedArgsLength].optional) {
                mandatoryParams++;
            }
        }

        if (calledArgsLen < mandatoryParams) {
            throw 'Method ' + methodCfg.name + ' called with invalid number of params. Expected: ' + mandatoryParams + ' mandatory params Called:' + calledArgsLen;
        }
        else {
            var item = calledArgsLen;
            var invalidTypes = [];
            while (item) {
                item--;
                var invalidType = this.validateType(arguments[item], methodCfg.args[item], item);
                invalidTypes = invalidType.concat(invalidTypes);
            }

            if (invalidTypes.length) {
                throw 'Method ' + methodCfg.name + ' called with invalid params. ' + invalidTypes.join('; ');
            }
        }
        var returnValue = methodCfg.returnValue;
        if (methodCfg.callThrough) {
            returnValue = methodCfg.origMethod.apply(this.appTestObj[methodCfg.name] ? this.appTestObj : this.appTestObj.getController(), arguments);
        }
        else
            if (Ext.isFunction(returnValue)) {
                returnValue = returnValue.apply(this.appTestObj, arguments);
            }

        return returnValue;
    },

    /**
     * Mocks child components
     *
     * @param {Ext.Component} cmp
     */
    mockChildComponents: function(cmp){
        this.mockChildComponentsArray(cmp.items);
        this.mockCustomReferences(cmp);
    },

    /**
     * If component have items array iterates through it and mocks CustomApp objects
     *
     * @param {Ext.util.MixedCollection} items Component items
     */
    mockChildComponentsArray: function(items){
        if (items) {
            var item = items.getCount();
            var current;
            var currentName;
            while (item) {
                item--;
                current = items.getAt(item);
                currentName = Ext.ClassManager.getName(current);

                if (this.isCustomAppNameSpace(currentName.split('.')[0])) {
                    var mock = this.mockComponent(current);
                    if (mock) {
                        items.replace(items.getKey(current), mock);
                        var reference = current.reference;
                        if (reference) {
                            var references = this.appTestObj.getReferences();
                            references[reference] = mock;
                            mock.reference = reference;
                        }
                    }
                }
                else {
                    this.mockChildComponents(current);
                }
            }
        }
    },

    /**
     * Returns mock object for supplied component
     *
     * @param {Ext.Component} cmp Component to mock
     *
     * @returns {Ext.Component} Component mock
     */
    mockComponent: function(cmp){
        var cmpName = Ext.ClassManager.getName(cmp);
        var testName = 'TEST.' + cmpName;

        var testRef;
        var test = window.location.search.slice(6);
        if (test) {
            //noinspection JSValidateTypes
            testRef = Ext.syncRequire(testName);
        }
        else {
            testRef = Ext.ClassManager.get(testName);
        }

        var mock;
        if (!testRef) {
            console.warn('Test for class ' + cmpName + ' is not created!');
        }
        else {
            testRef.appTestObj = cmp;
            mock = testRef.createMockObj(undefined, testRef);
        }

        return mock;
    },

    /**
     * Mocks components not in parent/child chain but attached as p_ references
     *
     * @param {Ext.Component} cmp Component
     */
    mockCustomReferences: function(cmp){
        for (var item in cmp) {
            if (this.isCustomProperty(item)) {
                var ref = cmp[item];
                var refName = Ext.ClassManager.getName(ref);
                if (this.isCustomAppNameSpace(refName.split('.')[0])) {
                    var mock = this.mockComponent(ref);
                    if (mock) {
                        cmp[item] = mock;
                    }
                }
            }
        }
    },

    /**
     * Creates object with all the custom methods and properties of the tested class which need to be mocked
     *
     * @param {Object} objPrototype
     * @param {TEST.Abstract} scope Test instance to be used for parent mocks scope. This is needed when resolving appTestObj in parent mocks - mvidojevic
     *
     * @returns {Object} mockObj
     */
    mockMethodsAndProperties: function(objPrototype, scope){
        scope = scope ? scope : this;
        var className = Ext.getClassName(objPrototype);
        var isViewController = objPrototype.isViewController;
        var mockObj = {};
        var mockCfg;
        var mocks = isViewController ? scope.collectViewControllerMocks(objPrototype) : scope.appMocks;
        var mapForUnitTests = TEST.mapForUnitTests[className];//Added to differentiate test class functions from inherited parent functions
        for (var property in mapForUnitTests) {
            if (mapForUnitTests.hasOwnProperty(property)) {
                mockCfg = mocks[property];
                if (this.isCustomProperty(property)) {
                    if ((Ext.Array.indexOf(this.appNoMocks, property) === -1) && !mockCfg) {
                        console.error(className + ' property ' + property + ' not mocked');
                        throw '';
                    }
                    else {
                        mockObj[property] = mockCfg;
                        if (isViewController) {
                            if (!Ext.Array.contains(this.appControllerMockedProperties, property)) {
                                this.appControllerMockedProperties.push(property);
                            }
                        }
                        else {
                            if (!Ext.Array.contains(this.appMockedProperties, property)) {
                                this.appMockedProperties.push(property);
                            }
                        }
                    }
                }
                else
                    if (!mockCfg) {
                        console.error(className + ' method ' + property + ' not mocked');
                        throw '';
                    }
                    else {
                        Ext.apply(mockCfg, {
                            name: property,
                            origMethod: objPrototype[property]
                        });
                        //noinspection JSValidateTypes
                        mockObj[property] = Ext.bind(this.methodMock, scope, [mockCfg], true);
                        if (isViewController) {
                            if (!Ext.Array.contains(this.appControllerMockedProperties, property)) {
                                this.appControllerMockedProperties.push(property);
                            }
                        }
                        else {
                            if (!Ext.Array.contains(this.appMockedProperties, property)) {
                                this.appMockedProperties.push(property);
                            }
                        }

                    }
            }
        }
        for (var mockProperty in mocks) {
            if (mocks.hasOwnProperty(mockProperty) && !this.isCustomProperty(mockProperty)) {
                mockCfg = mocks[mockProperty];
                Ext.apply(mockCfg, {
                    name: mockProperty,
                    origMethod: objPrototype[mockProperty]
                });
                mockObj[mockProperty] = Ext.Function.bind(this.methodMock, scope, [mockCfg], true);
                if (isViewController) {
                    if (!Ext.Array.contains(this.appControllerMockedProperties, mockProperty)) {
                        this.appControllerMockedProperties.push(mockProperty);
                    }
                }
                else {
                    if (!Ext.Array.contains(this.appMockedProperties, mockProperty)) {// We need this check because of mixin mocks - mvidojevic
                        this.appMockedProperties.push(mockProperty);
                    }
                }
            }
        }

        return mockObj;
    },

    /**
     * Consoles logs if mocks exist for function which don't exist in the testes class
     *
     * @param {Object} objPrototype
     */
    notifyIfObsoleteMocksExist: function(objPrototype){
        var obsoleteMocks = this.getObsoleteMocks(objPrototype);
        if (obsoleteMocks.length) {
            console.warn(this.appFullClassName + ' obsolete mocks detected: ' + obsoleteMocks.join(', '));
        }
    },

    /**
     * Handling cava response validation error messages from ajax response
     * @param {Object} data - The XMLHttpRequest object containing the response data.
     * @param {Object} options - The parameter to the request call.
     * @param {Ext.Function} done - binded argument, passing Jasmine method done()
     */
    responseHandler: function(data, options, done){
        var response = Ext.decode(data.responseText, true);
        var messages = response.messages;
        if (messages.length) {
            var item = 0;
            var current;
            var errorMsg;
            while (item < messages.length) {
                current = messages[item];
                errorMsg = JSON.stringify(current.message);
                console.error(errorMsg);
                this.appErrorStatus += '\n' + errorMsg + '\n';
                item++;
            }
        }
        this.appAjaxRequestsCount--;
        if (this.appAjaxRequestsCount === 0) {
            done();
        }
    },

    /**
     * On Cava validation failure
     *
     * @param {Object} data
     * @param {Object} options
     * @param {Function} done
     */
    requestValidationFailure: function(data, options, done){
        var response = Ext.decode(data.responseText);
        console.error(response.error + ': ' + response.message);
        this.doneTesting(done, true);
    },

    /**
     * Tests component loading and initialization
     *
     * @param {String} evalClassName
     * @param {String} fullClassName
     */
    runInitializationTest: function(evalClassName, fullClassName){
        var me = this;
        describe('Initial tests', function(){
            it('Class loaded successfully', function(){
                expect(evalClassName).toBeDefined();
            });

            if (evalClassName) {
                it('Class can be initialized', function(){
                    if (me.appPreventObjectCreation) {
                        me.appTestObj = fullClassName;
                    }
                    else
                        if (evalClassName) {
                            if (evalClassName.singleton) {
                                me.appTestObj = evalClassName;
                            }
                            else {
                                try {
                                    if (me.appTestWillHandleObj) {
                                        me.appTestObj = me.selfCreateTestObject();
                                    }
                                    else {
                                        spyOn(Ext.Ajax, 'request');
                                        me.appTestObj = Ext.create(fullClassName, me.getClassInitObject(me));

                                        if (me.appTestObj.isXType('window')) {
                                            me.appTestObj.show();
                                        }
                                        else {
                                            var viewportSize = Ext.getBody().getViewSize();
                                            var tmpWindow = Ext.create('Ext.window.Window', {
                                                height: viewportSize.height,
                                                layout: 'fit',
                                                width: viewportSize.width,
                                                items: [me.appTestObj]
                                            });
                                            tmpWindow.show();
                                        }
                                    }
                                }
                                catch (e) {
                                    console.log(e)
                                }
                            }
                        }

                    var objType = me.appPreventObjectCreation ? 'string' : 'object';

                    expect(typeof me.appTestObj).toBe(objType);
                });
            }

        });
    },

    /**
     * Empty method. Child class should override this method and place all tests in it
     */
    runTests: function(){
    },

    /**
     * Tests that need to create test obj specifically need to override this method
     */
    selfCreateTestObject: function(){
        throw 'Abstract method call';
    },

    /**
     * Sets the endpoints which will be used by the current class we are testing
     */
    setEndPoints: function(){
        var utilEndPoints = {};
        var endpoints = this.appAjaxData.endpoints;
        var item = endpoints.length;
        var current;
        while (item) {
            item--;
            current = endpoints[item];
            utilEndPoints[current.name] = current.path;
        }
        Common.util.Util.setEndPoints(utilEndPoints);
    },

    /**
     * Add spies to test object and redirect calls to mock object methods skipping the method provided as argument
     *
     * @param {String} methodToSkip Name of the method that should not be mocked
     */
    spyOwnMethodsAndRedirectToMock: function(methodToSkip){
        var item = this.appMockedProperties.length;
        var propName;
        var fn;
        while (item) {
            item--;
            propName = this.appMockedProperties[item];
            fn = this.appMockObj[propName];
            if ((propName !== methodToSkip) && Ext.isFunction(fn)) {
                spyOn(this.appTestObj, propName).and.callFake(fn)
            }
        }

        item = this.appControllerMockedProperties.length;
        while (item) {
            item--;
            propName = this.appControllerMockedProperties[item];
            fn = this.appMockObj.getController()[propName];
            if ((propName !== methodToSkip) && Ext.isFunction(fn)) {
                spyOn(this.appTestObj.getController(), propName).and.callFake(fn)

            }
        }
    },

    /**
     * Syncs mixin test files in order to obtain mock objects for the mixin
     *
     * @param {Object} mixins
     */
    syncMixinsMocks: function(mixins){
        for (var mixinName in mixins) {
            if (mixins.hasOwnProperty(mixinName)) {
                this.handleMixinMockSync(mixins[mixinName]);
            }
        }
    },

    /**
     * If mixin is CustomApp class then sync requires and updates mock with mixin test mocks
     *
     * @param {String} mixin
     */
    tryToUpdateMocksIfCustomAppMixin: function(mixin){
        if (this.isCustomAppNameSpace(mixin.split('.')[0])) {
            //noinspection JSValidateTypes
            var mixinTest = Ext.syncRequire('TEST.' + mixin);
            this.updateMocksOrThrowIfNoMixinTest(mixin, mixinTest);
        }
    },

    /**
     * If no mixin test throws error else updates test appMocks with mixin test mocks selectably, meaning only adding mixin mocks which have not already been defined
     *
     * @param {String} mixin
     * @param {TEST.Abstract} mixinTest
     */
    updateMocksOrThrowIfNoMixinTest: function(mixin, mixinTest){
        if (!mixinTest) {
            console.error('Mixin test missing. Please write test for ' + mixin + ' first.');
            throw '';
        }
        else {
            var mapForUnitTests = TEST.mapForUnitTests[mixin];
            var mockableMixinProperties = this.getMockableMixinProperties(mixinTest, mapForUnitTests);
            var mixinPropertyCount = Object.keys(mockableMixinProperties).length;
            if (mixinPropertyCount) {
                var missingMixinMocks = this.getMissingMixinMocks(mockableMixinProperties, mixinTest.appMocks);
                if (missingMixinMocks.length) {
                    var mixinNames = missingMixinMocks.join(', ');
                    console.error(mixin + ' mock missing. Please write mocks for ' + mixinNames + ' first.');
                    throw '';
                }
                else {
                    Ext.applyIf(this.appMocks, mixinTest.appMocks);
                }
            }
        }
    },

    /**
     * Validates array items type
     *
     * @param {Array} arr Array to check
     * @param {Object} expectedItem Expected Array items cfg
     *
     * @returns {String[]} Invalid types
     */
    validateArrayItems: function(arr, expectedItem){
        var item = arr.length;
        var invalidTypes = [];
        while (item) {
            item--;
            var invalidItemType = this.validateType(arr[item], expectedItem);
            invalidTypes = invalidItemType.concat(invalidTypes);
        }

        return invalidTypes;
    },

    /**
     * On Cava validation success
     *
     * @param {Object} data Response params
     * @param {Object} options
     * @param {Function} done
     */
    validateRequest: function(data, options, done){
        if (!Ext.isEmpty(data.messages)) {
            var forceDone = true;
            var errors = data.messages;
            var numberOfErrors = errors.length;
            while (numberOfErrors) {
                numberOfErrors--;
                console.error(errors[numberOfErrors].message);
            }
        }
        else {
            this.appInvalidRequestsCounter--;
        }
        this.doneTesting(done, forceDone);
    },

    /**
     * Validates called argument type
     *
     * @param {Mixed} calledArg Called argument
     * @param {Object} expectedArg Expected argument cfg
     * @param {Boolean} [expectedArg.acceptNull] True if null can be passed as a valid value, false otherwise
     * @param {Boolean} [expectedArg.acceptUndefined] True if undefined can be passed as a valid value, false otherwise
     * @param {Boolean} [expectedArg.acceptUndefined] True if undefined can be passed as a valid value, false otherwise
     * @param {String/String[]} expectedArg.type Type of the receiving argument. Avoid passing String[]. Strings passed can be simple strings, custom types or the full name of an ExtJS class
     * @param {String} expectedArg.xtype xtype of the passing argument if the argument is a Ext object
     * @param {Number} [argIdx] Called argument idx
     * @param {Number} [typeIdx]
     *
     * @returns {String[]} Invalid types
     */
    validateType: function(calledArg, expectedArg, argIdx, typeIdx){
        var expectedArgType = expectedArg.type;
        if (Ext.isDefined(typeIdx)) {
            expectedArgType = expectedArgType[typeIdx];
        }
        var invalidTypes = [];
        var stringStart = Ext.isDefined(argIdx) ? 'Param index: ' + argIdx + ' ' : '';
        var errorMsg;
        var called;
        if (Ext.isArray(expectedArgType)) {
            var typesArrayLength = expectedArgType.length;
            var isValid;
            while (!isValid && typesArrayLength) {
                typesArrayLength--;
                invalidTypes = this.validateType(calledArg, expectedArg, argIdx, typesArrayLength);
                isValid = !invalidTypes.length;
            }

            if (!isValid) {
                errorMsg = stringStart + 'Expected types: ' + expectedArgType.join(' ,') + ' Called type: ';
                called = typeof calledArg;
            }
        }
        else {
            var nullOK = expectedArg.acceptNull && calledArg === null;
            var undefinedOK = expectedArg.acceptUndefined && calledArg === undefined;
            if (!(nullOK || undefinedOK)) {
                if (expectedArg.xtype) {
                    if (!calledArg.isXType(expectedArg.xtype)) {
                        errorMsg = stringStart + 'Expected xtype: ' + expectedArgType + ' Called xtype: ';
                        called = calledArg.getXType();
                    }
                }
                else {
                    if (expectedArgType.indexOf('.') !== -1) {
                        var typeInvalid = true;
                        var className = true;
                        var objCheck = calledArg;
                        if (Ext.isSimpleObject(objCheck) && expectedArgType.split('.')[1] === 'type') {
                            Ext.create(expectedArgType, objCheck);
                        }
                        else {
                            while (typeInvalid && className) {
                                className = Ext.getClassName(objCheck);
                                if (className) {
                                    typeInvalid = className !== expectedArgType;
                                    objCheck = objCheck.superclass;
                                }
                            }

                            if (typeInvalid) {
                                errorMsg = stringStart + 'Expected: ' + expectedArgType + ' Called: ';
                                called = Ext.getClassName(calledArg);
                            }
                        }
                    }
                    else {
                        if (expectedArgType === 'array') {
                            if (!Ext.isArray(calledArg)) {
                                errorMsg = stringStart + 'Expected: ' + expectedArgType + ' Called: ';
                                called = typeof calledArg;
                            }
                            else {
                                if (!expectedArg.argItem) {
                                    throw 'When defining array arg you must provide type for array items';
                                }
                                else {
                                    var invalidArrayItems = this.validateArrayItems(calledArg, expectedArg.argItem);
                                    if (invalidArrayItems.length) {
                                        invalidTypes = invalidArrayItems.concat(invalidTypes);
                                        invalidTypes.splice(0, 0, 'Invalid array items: ');
                                    }
                                }
                            }
                        }
                        else
                        /*if (Ext.isObject(calledArg)) {
                         invalidTypes.splice(0, 0, 'Object params must be provided as custom types');
                         }
                         else*/
                            if (!Ext.isElement(calledArg) && expectedArgType === 'HTMLElement') {
                                errorMsg = stringStart + 'Expected: ' + expectedArgType + ' Called: ';
                                called = typeof calledArg;
                            }
                            else
                                if (!Ext.isObject(calledArg) && expectedArgType === 'Blob' && typeof calledArg !== 'object') {
                                    errorMsg = stringStart + 'Expected: ' + expectedArgType + ' Called: ';
                                    called = typeof calledArg;
                                }
                                else
                                    if (!Ext.isElement(calledArg) && !Ext.isObject(calledArg) && typeof calledArg !== expectedArgType) {
                                        errorMsg = stringStart + 'Expected: ' + expectedArgType + ' Called: ';
                                        called = typeof calledArg;
                                    }
                    }
                }
            }
        }

        if (errorMsg && called) {
            invalidTypes.splice(0, 0, errorMsg + called);
        }

        return invalidTypes;
    }
});
