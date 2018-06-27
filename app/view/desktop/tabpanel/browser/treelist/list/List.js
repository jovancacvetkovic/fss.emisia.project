/**
 * FSS Browser List
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.List', {
    extend: 'Ext.dataview.List',

    requires: [
        'FSS.view.desktop.tabpanel.browser.treelist.list.ListController',
        'FSS.view.desktop.tabpanel.browser.treelist.list.ListModel'
    ],

    xtype: 'fssList',

    viewModel: {
        type: 'list'
    },

    config: {
        selectedId: ''
    },

    controller: 'fssBrowserListController',

    baseCls: 'fssList',

    grouped: true,

    groupHeader: {
        tpl: '{name}'
    },

    selectable: {
        mode: 'single',
        deselectable: false,
        triggerEvent: 'prevent-childtap',
        triggerCtEvent: 'prevent-tap'
    },

    bind: {
        store: '{list}'
    },

    itemTpl: '{name:htmlEncode}',

    /**
     * @inheritDoc
     */
    onItemDeselect: function (records, suppressEvent) {
        // noinspection JSAccessibilityCheck
        this.callParent(arguments);

        var record = records[0];
        var findBy = Ext.Function.bind(this.getItemByRecord, this, [record], 1);
        // noinspection JSUnresolvedVariable
        var item = this.items.findBy(findBy);
        if (item && item.removeCls) {
            item.removeCls(record.get('group'));
        }
    },

    /**
     * @inheritDoc
     */
    onItemSelect: function (record, suppressEvent) {
        // noinspection JSAccessibilityCheck
        this.callParent(arguments);

        var findBy = Ext.Function.bind(this.getItemByRecord, this, [record], 1);
        // noinspection JSUnresolvedVariable
        var item = this.items.findBy(findBy);
        if (item && item.removeCls) {
            item.addCls(record.get('group'));
        }
    },

    getItemByRecord: function (item, record) {
        var itemRecord = item._record;
        return itemRecord && itemRecord.get('id') === record.get('id');
    },
});