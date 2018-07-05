/**
 * List grouper header component
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.header.Header', {
    extend: 'Ext.dataview.ItemHeader',

    requires: [
        'FSS.view.desktop.tabpanel.browser.treelist.list.header.HeaderModel',
        'FSS.view.desktop.tabpanel.browser.treelist.list.header.HeaderController'
    ],

    xtype: 'fssListHeader',

    viewModel: {
        type: 'fssListHeaderModel'
    },

    controller: 'fssListHeaderController',

    getTpl: function () {
        return new Ext.XTemplate(['{name}']);
    }
});