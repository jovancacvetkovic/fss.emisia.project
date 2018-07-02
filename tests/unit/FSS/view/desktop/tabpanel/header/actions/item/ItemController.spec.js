describe('FSS.view.desktop.tabpanel.header.actions.item.ItemController', function(){

    //reusable scoped variable
    var Item = null;
    var ItemController = null;

    //setup/teardown
    beforeEach(function(){
        Item = Ext.create('FSS.view.desktop.tabpanel.header.actions.item.Item', {
            renderTo: 'test'
        });
        ItemController = Item.getController();

        jasmine.addMatchers(matchers);
    });

    afterEach(function(){
        Item.destroy();
    });

    it('should not fail on onLocaleTriggered', function(){
        expect(function(){
            ItemController.onLocaleTriggered(Item);
        }).not.toThrow();
    });
});