/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.tabpanel.messages.Messages', {
    extend: 'Ext.Panel',
    
    requires: [
        'Ext.layout.HBox',
        'FSS.view.desktop.tabpanel.messages.MessagesController',
        'FSS.view.desktop.tabpanel.messages.MessagesModel',
        'FSS.view.desktop.tabpanel.messages.details.Details',
        'FSS.view.desktop.tabpanel.messages.folder.Folder'
    ],
    
    xtype: 'fssMessages',
    
    viewModel: {
        type: 'fssMessagesModel'
    },
    
    controller: 'fssMessagesController',
    
    layout: {
        type: 'hbox'
    },
    
    items: [{
        xtype: 'fssMessagesFolder'
    }, {
        xtype: 'fssMessagesDetails'
    }]
});