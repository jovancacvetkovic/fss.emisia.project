/**
 * Created by emisia on 5/8/18.
 */
Ext.define('FSS.view.desktop.header.actions.Actions', {
    extend: 'Ext.tab.Panel',

    requires: [
        'FSS.view.desktop.header.actions.ActionsModel',
		'FSS.view.desktop.header.actions.ActionsController'
    ],

    xtype: 'fssHeaderActions',

    viewModel: {
        type: 'fssHeaderActionsModel'
    },

    controller: 'fssHeaderActionsController',

    items: [{
    
    }]
});