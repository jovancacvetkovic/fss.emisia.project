describe('FSS.view.desktop.tabpanel.header.actions.item.ItemController', function(){

    //reusable scoped variable
    var Item = null;
    var ItemController = null;

    //setup/teardown
    beforeEach(function(){
        //create a fresh grid for every test to avoid test pollution
        Item = Ext.create('FSS.view.desktop.tabpanel.header.actions.item.Item', {
            renderTo: 'test'
        });
        ItemController = Item.getController();

        jasmine.addMatchers(matchers);
    });

    afterEach(function(){
        //destroy the grid after every test so we don't pollute the environment
        Item.destroy();
    });

    it('should not fail on onLocaleTriggered', function(){
        expect(function(){
            ItemController.onLocaleTriggered(Item);
        }).not.toThrow();
    });
});