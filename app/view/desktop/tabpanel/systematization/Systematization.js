/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.tabpanel.systematization.Systematization', {
    extend: 'Ext.Panel',

    requires: [
        'FSS.view.desktop.tabpanel.systematization.SystematizationController',
        'FSS.view.desktop.tabpanel.systematization.SystematizationModel'
    ],

    xtype: 'fssSystematization',

    viewModel: {
        type: 'systematization'
    },

    controller: 'systematization',

    items: [
        /* include child components here */
    ]
});