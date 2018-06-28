describe('FSS.view.desktop.tabpanel.browser.BrowserController', function(){
    
    //reusable scoped variable
    let browser = null;
    
    //setup/teardown
    beforeEach(function(){
        if (browser) {
            browser.destroy();
        }
        //create a fresh grid for every test to avoid test pollution
        browser = Ext.create('FSS.view.desktop.tabpanel.browser.Browser', {
            renderTo: 'test'
        });
    });
    
    afterEach(function(){
        //destroy the grid after every test so we don't pollute the environment
        browser.destroy();
    });
    
    it('should inherit from Ext.Container', function(){
        expect(browser.isXType('container')).toEqual(true);
    });
});