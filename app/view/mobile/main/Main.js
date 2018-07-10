/**
 * Mobile main view
 */
Ext.define('FSS.view.mobile.main.Main', {
    extend: 'FSS.view.desktop.main.Main',

    requires: [
        'FSS.view.mobile.main.MainController',
        'FSS.view.mobile.main.MainModel',
        'FSS.view.mobile.tabpanel.browser.Browser',
        'FSS.view.mobile.tabpanel.header.Header'
    ],

    xtype: 'fssMobileMain',

    viewModel: {
        type: 'fssMobileMainModel'
    },
    
    cls: 'fssMobileMain',
    
    controller: 'fssMobileMainController',

    config: {
        tabBar: {
            xtype: 'fssMobileHeader'
        }
    },

    items: [{
        xtype: 'fssMobileBrowser',
        reference: 'browser',
        pageId: 'browser',
        title: '&nbsp;'
    }, {
        xtype: 'fssMessages',
        reference: 'messages',
        pageId: 'messages',
        title: '&nbsp;'
    }, {
        xtype: 'fssSystematization',
        reference: 'systematization',
        pageId: 'systematization',
        title: '&nbsp;'
    }]
});