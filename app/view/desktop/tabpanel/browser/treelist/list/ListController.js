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

    loadListData: function (data, nextListReference) {
        let store = this.getView().getStore();
        var loadFn = Ext.Function.bind(this.onLoadHandler, this, [nextListReference], 2);
        store.on('load', loadFn, this, {
            single: true
        });
        store.loadRawData(data);
    },

    findItemById: function (itemId) {
        return this.getView().getStore().findRecord('id', itemId);
    },

    getActiveListItem: function () {
        //noinspection JSUnresolvedVariable
        var item = this._activeListItem;
        item = Ext.isString(item) ? this.findItemById(item) : item;

        if (!item && this.getSelectFirstListItem()) {
            item = this.getView().getStore().getAt(0);
        }

        return item;
    },

    onLoadHandler: function (store, records, nextListReference) {
        var list = this.getView();
        var item = this.getActiveListItem();

        if (item) {
            let selectable = list.getSelectable();
            selectable.select(item, false, true);
            list.getController().setLastSelectedItem(item);

            this.onListSelect(list, item, nextListReference);
        }

        this.setMasked(false);
    },

    onListSelect: function (list, listItem, nextListReference) {
        let itemData = listItem.getData();
        this.fireEvent('itemSelect', itemData.id, nextListReference);
    }
});