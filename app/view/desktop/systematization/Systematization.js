/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.systematization.Systematization', {
    extend: 'Ext.Container',

    requires: [
        'FSS.view.desktop.systematization.SystematizationModel',
		'FSS.view.desktop.systematization.SystematizationController'
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