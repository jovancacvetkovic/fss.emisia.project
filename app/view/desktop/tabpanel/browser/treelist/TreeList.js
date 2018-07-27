/**
 * Browser leagues tree-list
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.TreeList', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.Panel',
        'Ext.layout.HBox',
        'FSS.view.desktop.tabpanel.browser.treelist.TreeListController',
        'FSS.view.desktop.tabpanel.browser.treelist.TreeListModel',
        'FSS.view.desktop.tabpanel.browser.treelist.list.List',
        'FSS.view.desktop.tabpanel.browser.treelist.list.collapsible.Collapsible'
    ],

    xtype: 'fssTreeList',

    viewModel: {
        type: 'fssTreeListModel'
    },

    cls: 'fssTreeList',

    controller: 'fssTreeListController',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'fssList',
        reference: 'leagueList',
        cls: 'fssListUiBase',
        selectFirstListItem: true
    }, {
        xtype: 'fssCollapsiblePanel',
        reference: 'subLeagueListPanel',
        items: [{
            xtype: 'fssList',
            reference: 'subLeagueList',
            cls: 'fssListUiReverted'
        }]
    }, {
        xtype: 'fssCollapsiblePanel',
        reference: 'teamListPanel',
        items: [{
            xtype: 'fssList',
            reference: 'teamList',
            cls: 'fssListUiReverted fssListUiLast'
        }]
    }]
});