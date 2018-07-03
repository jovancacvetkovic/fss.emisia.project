describe('FSS.mixin.Prepare', function () {
    //reusable scoped variable
    var Prepare = null;

    beforeEach(function () {
        //create a fresh grid for every test to avoid test pollution
        Prepare = new FSS.mixin.Prepare;

        jasmine.addMatchers(matchers);
    });

    afterEach(function () {
        Prepare.destroy();
    });

    describe('should not fail on prepareLeaguesData', function () {
        it('should not fail on prepareLeaguesData', function () {
            expect(function () {
                Prepare.prepareLeaguesData();
            }).not.toThrow();
        });
    });
});