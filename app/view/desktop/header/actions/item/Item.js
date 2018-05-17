/**
 * Created by emisia on 5/8/18.
 */
Ext.define('FSS.view.desktop.header.actions.item.Item', {
    extend: 'Ext.Button',

    requires: [
        'FSS.view.desktop.header.actions.item.ItemModel',
		'FSS.view.desktop.header.actions.item.ItemController'
    ],

    xtype: 'fssHeaderActionItem',

    viewModel: {
        type: 'fssHeaderActionItemModel'
    },

    cls: 'fssHeaderActionsBarItem',
    
    controller: 'fssHeaderActionItemController',
    
    ui: 'plain round'
});