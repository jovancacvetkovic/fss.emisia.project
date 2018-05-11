/**
 * Created by emisia on 5/8/18.
 */
Ext.define('FSS.view.desktop.header.actions.item.Item', {
    extend: 'Ext.Component',

    requires: [
        'FSS.view.desktop.header.actions.item.ItemModel',
		'FSS.view.desktop.header.actions.item.ItemController'
    ],

    xtype: 'fssHeaderActionItem',

    viewModel: {
        type: 'fssHeaderActionItemModel'
    },

    controller: 'fssHeaderActionItemController',

    tpl: [
        '<div class="fssHeaderActionItem">',
            '<',
        '</div>'
    ]
});