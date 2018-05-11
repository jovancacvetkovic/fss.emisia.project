/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.main.Main', {
    extend: 'Ext.tab.Panel',

    requires: [
        'FSS.view.desktop.browser.Browser',
        'FSS.view.desktop.header.Header',
        'FSS.view.desktop.main.MainController',
        'FSS.view.desktop.main.MainModel',
        'FSS.view.desktop.messages.Messages',
        'FSS.view.desktop.systematization.Systematization'
    ],

    xtype: 'fssDesktopMain',

    viewModel: {
        type: 'fssDesktopMainModel'
    },

    cls: 'fssDesktopMain',
    
    controller: 'fssDesktopMainController',
    
    config: {
        tabBar: {
            xtype: 'fssHeader'
        }
    },

    items: [{
        xtype: 'fssBrowser',
        reference: 'fssBrowser',
        title: 'Pretrazivac'
    }, {
        xtype: 'fssMessages',
        reference: 'fssMessages',
        title: 'Poruke'
    }, {
        xtype: 'fssSystematization',
        reference: 'fssSystematization',
        title: 'Sistematizacija'
    }]
});