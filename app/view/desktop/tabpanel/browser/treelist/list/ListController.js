/**
 * Created by emisia on 5/17/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssBrowserListController',

    config: {
        activeListItem: undefined,
        lastSelectedItem: undefined,
        selectFirstListItem: false
    },

    loadListData: function (data) {
        var store = this.getListStore();
        store.on('load', this.onLoadHandler, this, {
            single: true
        });
        store.loadRawData(data);
    },

    findItemById: function (itemId) {
        var store = this.getListStore();
        return store.findRecord('id', itemId);
    },

    getActiveListItem: function () {
        //noinspection JSUnresolvedVariable
        var item = this._activeListItem;
        item = Ext.isString(item) ? this.findItemById(item) : item;

        if (!item && this.getSelectFirstListItem()) {
            var store = this.getListStore();
            // If selectFirstListItem is `true` get first store record
            item = store.getAt(0);
        }

        return item;
    },

    getListStore: function(){
        return this.getView().getViewModel().getStore('list');
    },

    onLoadHandler: function (store, records) {
        var list = this.getView();
        var item = this.getActiveListItem();

        var selectable = list.getSelectable();
        selectable.deselectAll(true);

        if (item) {
            selectable.select(item, false, true);
            list.getController().setLastSelectedItem(item);

            this.onListSelect(list, item);
        }

        var expand = records.length;
        this.fireEvent('expandList', expand, list.reference);
        this.setViewportMasked(false);
    },

    onListSelect: function (list, listItem) {
        var itemData = listItem.getData();
        this.fireEvent('itemSelect', itemData.id);
    }
});