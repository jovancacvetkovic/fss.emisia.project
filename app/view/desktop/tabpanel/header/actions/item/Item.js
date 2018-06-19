/**
 * Created by emisia on 5/8/18.
 */
Ext.define('FSS.view.desktop.tabpanel.header.actions.item.Item', {
    extend: 'Ext.Button',

    requires: [
        'FSS.view.desktop.tabpanel.header.actions.item.ItemController',
        'FSS.view.desktop.tabpanel.header.actions.item.ItemModel'
    ],

    xtype: 'fssHeaderActionItem',

    viewModel: {
        type: 'fssHeaderActionItemModel'
    },

    cls: 'fssHeaderActionsBarItem',
    
    controller: 'fssHeaderActionItemController',
    
    ui: 'plain round'
});