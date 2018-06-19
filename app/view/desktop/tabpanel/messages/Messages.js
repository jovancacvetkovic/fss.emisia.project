/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.tabpanel.messages.Messages', {
    extend: 'Ext.Panel',

    requires: [
        'FSS.view.desktop.tabpanel.messages.MessagesController',
        'FSS.view.desktop.tabpanel.messages.MessagesModel'
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