describe('FSS.view.desktop.tabpanel.browser.BrowserController', function(){
    
    //reusable scoped variable
    var Browser = null;
    var BrowserController = null;

    beforeEach(function(){
        if (Browser) {
            Browser.destroy();
        }
        Browser = Ext.create('FSS.view.desktop.tabpanel.browser.Browser', {
            renderTo: 'test'
        });
        BrowserController = Browser.getController();
    });
    
    afterEach(function(){
        Browser.destroy();
    });
    
    it('should inherit from Ext.Container', function(){
        expect(Browser).toInheritFrom('container');
    });

    it('should not fail on setScrollerLayout', function () {
        expect('setScrollerLayout').toPass(BrowserController, []);
    });

    describe('should not fail on onActiveRoute', function () {
        var args;
        beforeEach(function () {
            args = Ext.create('FSS.type.RouteArguments', {
                0: 'urlParam0',
                1: 'urlParam1',
                2: 'urlParam2',
                3: 'urlParam3'
            });
        });

        it('should not fail', function () {
            expect('onActiveRoute').toPass(BrowserController, [args]);
        });

        it('should not fail on toPassWithParams without args', function () {
            expect('onActiveRoute').toPass(BrowserController, [undefined]);
        });

        it('expect correct params to be passed', function () {
            expect('onActiveRoute').toPass(BrowserController, [args]);
        });
    });
});