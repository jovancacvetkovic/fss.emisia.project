/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.Browser', {
    extend: 'FSS.view.desktop.tabpanel.tab.Tab',
    xtype: 'fssBrowser',
    
    requires: [
        'Ext.layout.HBox',
        'FSS.view.desktop.scroller.Scroller',
        'FSS.view.desktop.tabpanel.browser.BrowserController',
        'FSS.view.desktop.tabpanel.browser.BrowserModel',
        'FSS.view.desktop.tabpanel.browser.details.Details',
        'FSS.view.desktop.tabpanel.browser.treelist.TreeList'
    ],

    viewModel: {
        type: 'fssBrowserModel'
    },
    
    controller: 'fssBrowserController',
    
    layout: {
        type: 'hbox'
    },
    
    items: [{
        xtype: 'fssTreeList',
        reference: 'leagueTreeList',
        minWidth: 220
    }, {
        xtype: 'fssDetails',
        reference: 'fssDetails',
        flex: 1
    }, {
        xtype: 'fssScroller',
        reference: 'scroller'
    }]
});