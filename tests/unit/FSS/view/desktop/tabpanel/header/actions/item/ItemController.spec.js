describe('FSS.view.desktop.tabpanel.header.actions.item.ItemController', function(){

    //reusable scoped variable
    var Item = null;
    var ItemController = null;

    beforeEach(function(){
        Item = Ext.create('FSS.view.desktop.tabpanel.header.actions.item.Item', {
            renderTo: 'test'
        });
        ItemController = Item.getController();
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