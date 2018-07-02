describe('FSS.mixin.Localization', function () {
    //reusable scoped variable
    var Locale = null;

    //setup/teardown
    beforeEach(function () {
        //create a fresh grid for every test to avoid test pollution
        Locale = new FSS.mixin.Localization;

        jasmine.addMatchers(matchers);
    });

    afterEach(function () {
        Locale.destroy();
    });

    describe('should not fail on initLocalization', function () {

        it('should not fail on initLocalization', function () {
            expect(function () {
                Locale.initLocalization();
            }).not.toThrow();
        });
    });

    describe('should not fail on onChangeLocale', function () {
        it('should not fail on onChangeLocale', function () {
            expect(function () {
                var store = new FSS.store.Localization;
                var model = new Ext.data.Model;
                Locale.onChangeLocale(store, [model]);
            }).not.toThrow();
        });
    });

    describe('should not fail on getSuperLocale', function () {
        // not applicable
    });
});