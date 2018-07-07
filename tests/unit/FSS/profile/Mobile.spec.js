describe('FSS.profile.Mobile', function () {
    //reusable scoped variable
    var Mobile = null;

    beforeEach(function () {
        //create a fresh grid for every test to avoid test pollution
        Mobile = Ext.create('FSS.profile.Mobile', {});

        jasmine.addMatchers(matchers);
    });

    afterEach(function () {
        Mobile.destroy();
    });

    describe('should not fail on isActive', function () {
        it('should not fail on isActive', function () {
            expect(function () {
                Mobile.isActive();
            }).not.toThrow();
        });

        xit('expect to return correct type', function () {
            var result = Mobile.isActive();
            expect(result).toMatchExpectedResult(Mobile, 'isActive');
        });
    });

    describe('should not fail on launch', function () {
        it('should not fail on launch', function () {
            expect(function () {
                Mobile.launch();
            }).not.toThrow();
        });
    });
});