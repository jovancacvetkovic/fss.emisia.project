/**
 * Mobile browser tab
 */
Ext.define('FSS.view.mobile.tabpanel.browser.Browser', {
    extend: 'FSS.view.desktop.tabpanel.tab.Tab',
    xtype: 'fssMobileBrowser',

    requires: [
        'Ext.layout.HBox',
        'FSS.view.desktop.scroller.Scroller',
        'FSS.view.desktop.tabpanel.browser.BrowserModel',
        'FSS.view.desktop.tabpanel.browser.details.Details', /*,
        'FSS.view.desktop.tabpanel.browser.treelist.TreeList'*/
        'FSS.view.mobile.tabpanel.browser.BrowserController',
        'FSS.view.mobile.tabpanel.browser.details.Details'
    ],

    viewModel: {
        type: 'fssBrowserModel'
    },

    controller: 'fssMobileBrowserController',

    layout: {
        type: 'hbox'
    },

    items: [{
        xtype: 'fssMobileDetails',
        reference: 'fssDetails',
        flex: 1
    }, {
        xtype: 'fssScroller',
        reference: 'scroller'
    }]
});