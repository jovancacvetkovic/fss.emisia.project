/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.browser.Browser', {
    extend: 'Ext.Container',

    requires: [
        'FSS.view.desktop.browser.BrowserModel',
		'FSS.view.desktop.browser.BrowserController'
    ],

    xtype: 'fssBrowser',

    viewModel: {
        type: 'browser'
    },

    controller: 'browser',

    items: [
        /* include child components here */
    ]
});