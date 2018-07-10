/**
 * Desktop main view
 */
Ext.define('FSS.view.desktop.main.Main', {
    extend: 'Ext.tab.Panel',

    requires: [
        'FSS.view.desktop.main.MainController',
        'FSS.view.desktop.tabpanel.browser.Browser',
        'FSS.view.desktop.tabpanel.header.Header',
        'FSS.view.desktop.tabpanel.messages.Messages',
        'FSS.view.desktop.tabpanel.systematization.Systematization'
    ],

    xtype: 'fssDesktopMain',

    cls: 'fssDesktopMain',
    
    controller: 'fssDesktopMainController',
    
    config: {
        tabBar: {
            xtype: 'fssHeader'
        }
    },

    items: [{
        xtype: 'fssBrowser',
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