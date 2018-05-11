/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.messages.Messages', {
    extend: 'Ext.Container',

    requires: [
        'FSS.view.desktop.messages.MessagesModel',
		'FSS.view.desktop.messages.MessagesController'
    ],

    xtype: 'fssMessages',

    viewModel: {
        type: 'fssMessagesModel'
    },

    controller: 'fssMessagesController',

    items: [
        /* include child components here */
    ]
});