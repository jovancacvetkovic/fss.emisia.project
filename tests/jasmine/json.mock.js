'use strict';

// beforeEach override
// add current spec reference
var beforeEachMock = jasmine.Suite.prototype.beforeEach;
jasmine.Suite.prototype.beforeEach = function (...args) {
    self.currentSpec = this.result;
    beforeEachMock.apply(this, args);
};

// execute override
// add current spec reference
var executeMock = jasmine.Spec.prototype.execute;
jasmine.Spec.prototype.execute = function (...args) {
    self.currentSpec = this.result;
    executeMock.apply(this, args);
};

/**
 * Mock Service helper
 * @type {{jsonMock: {}, loadJsonFile: function}}
 */
var mockService = {
    jsonMock: {},
    loadJsonFile: function (fileName) {
        // make jsonMocks safe
        window.jsonMocks = window.jsonMocks ? window.jsonMocks : {};
        var json = {};

        if (fileName) {
            // create file path
            fileName = fileName.replace(/\./g, '/');

            // if filename has no mock suffix add it manually
            if (fileName.search('.mock') === -1) {
                fileName += '.mock';
            }

            json = window.jsonMocks[fileName];
            if (!json) {
                // if file has no json mocks add global mock
                json = window.jsonMocks['FSS/global.mock'];
            }
        }

        return json;
    }
};

// adds mockService.jsonMock to each `it` case
beforeEach(function () {
    var fileName = self.currentSpec.fullName.split(' ')[0];
    mockService.jsonMock = mockService.loadJsonFile(fileName);
});