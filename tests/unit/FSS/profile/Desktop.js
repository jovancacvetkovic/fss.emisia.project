describe('FSS.profile.Desktop', function () {
    //reusable scoped variable
    var Desktop = null;

    //setup/teardown
    beforeEach(function () {
        //create a fresh grid for every test to avoid test pollution
        Desktop = Ext.create('FSS.profile.Desktop', {});

        jasmine.addMatchers(matchers);
    });

    afterEach(function () {
        Desktop.destroy();
    });

    describe('should not fail on isActive', function () {
        it('should not fail on isActive', function () {
            expect(function () {
                Desktop.isActive();
            }).not.toThrow();
        });

        it('expect to return correct type', function () {
            let result = Desktop.isActive();
            expect(result).toMatchExpectedResult(Desktop, 'isActive');
        });
    });

    describe('should not fail on launch', function () {
        it('should not fail on launch', function () {
            expect(function () {
                Desktop.launch();
            }).not.toThrow();
        });
    });
});