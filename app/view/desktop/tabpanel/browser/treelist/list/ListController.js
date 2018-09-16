/**
 * League List View Controller
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssBrowserListController',
    
    config: {
        activeListItem: undefined
    },
    
    /**
     * Load list data
     * @param {Object[]} data
     */
    loadListData: function(data){
        var store = this.getListStore();
        store.on('load', this.onLoadHandler, this, {
            single: true
        });
        
        var list = this.getView();
        this.fireEvent('expandList', true, list.reference);
        store.loadRawData(data);
    },
    
    findItemById: function(itemId){
        var store = this.getListStore();
        return store.findRecord('id', itemId);
    },
    
    getActiveListItem: function(){
        //noinspection JSUnresolvedVariable
        var item = this._activeListItem;
        item = Ext.isString(item) ? this.findItemById(item) : item;
        
        if (!item && this.getView().getSelectFirstListItem()) {
            var store = this.getListStore();
            // If selectFirstListItem is `true` get first store record
            item = store.getAt(0);
        }
        
        return item;
    },
    
    getListStore: function(){
        return this.getView().getStore();
    },
    
    onLoadHandler: function(store, records){
        var list = this.getView();
        var item = this.getActiveListItem();
        var selectable = list.getSelectable();
        
        selectable.deselectAll(true);
        this.fireEvent('expandList', true, list.reference);
        
        if (item && list.getStore().getCount()) {
            selectable.select(item, false, true);
            var listId = item.get('id');
            this.fireEvent('itemSelect', listId);
        }
    }
}, function(Cls){
    Cls.mocks = {
        loadListData: {}
    };
});