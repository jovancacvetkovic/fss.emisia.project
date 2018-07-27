/**
 * Browser mobile tree-list
 */
Ext.define('FSS.view.mobile.tabpanel.browser.treelist.treelist.TreeList', {
    extend: 'FSS.view.desktop.tabpanel.browser.treelist.TreeList',

    xtype: 'fssMobileTreeList',

    requires: [
        'Ext.layout.Card',
        'FSS.view.mobile.tabpanel.browser.treelist.treelist.TreeListController'
    ],

    controller: 'fssMobileTreeListController',

    layout: {
        type: 'card'
    },

    activeItem: 0,

    items: [{
        xtype: 'fssList',
        reference: 'leagueList',
        cls: 'fssListUiBase',
        selectFirstListItem: true
    }, {
        xtype: 'fssList',
        reference: 'subLeagueList',
        cls: 'fssListUiReverted'
    }, {
        xtype: 'fssList',
        reference: 'teamList',
        cls: 'fssListUiReverted fssListUiLast'
    }]
});