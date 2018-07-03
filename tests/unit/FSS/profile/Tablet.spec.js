describe('FSS.profile.Tablet', function () {
    //reusable scoped variable
    var Tablet = null;

    beforeEach(function () {
        //create a fresh grid for every test to avoid test pollution
        Tablet = Ext.create('FSS.profile.Tablet', {});

        jasmine.addMatchers(matchers);
    });

    afterEach(function () {
        Tablet.destroy();
    });

    describe('should not fail on isActive', function () {
        it('should not fail on isActive', function () {
            expect(function () {
                Tablet.isActive();
            }).not.toThrow();
        });

        xit('expect to return correct type', function () {
            let result = Tablet.isActive();
            expect(result).toMatchExpectedResult(Tablet, 'isActive');
        });
    });

    describe('should not fail on launch', function () {
        it('should not fail on launch', function () {
            expect(function () {
                Tablet.launch();
            }).not.toThrow();
        });
    });
});