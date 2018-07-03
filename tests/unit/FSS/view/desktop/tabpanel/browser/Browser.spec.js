describe('FSS.view.desktop.tabpanel.browser.BrowserController', function(){
    
    //reusable scoped variable
    let browser = null;
    
    beforeEach(function(){
        if (browser) {
            browser.destroy();
        }
        browser = Ext.create('FSS.view.desktop.tabpanel.browser.Browser', {
            renderTo: 'test'
        });
    });
    
    afterEach(function(){
        browser.destroy();
    });
    
    it('should inherit from Ext.Container', function(){
        expect(browser.isXType('container')).toEqual(true);
    });
});