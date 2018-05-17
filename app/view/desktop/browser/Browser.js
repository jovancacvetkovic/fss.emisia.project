/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.browser.Browser', {
    extend: 'FSS.view.desktop.basic.Basic',

    requires: [
        'FSS.view.desktop.browser.BrowserModel',
		'FSS.view.desktop.browser.BrowserController'
    ],

    xtype: 'fssBrowser',

    viewModel: {
        type: 'browserModel'
    },

    controller: 'browserController'
});