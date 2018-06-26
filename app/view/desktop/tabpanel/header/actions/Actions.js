/**
 * FSS Desktop TabPanel Header Actions View
 */
Ext.define('FSS.view.desktop.tabpanel.header.actions.Actions', {
    extend: 'Ext.Toolbar',

    requires: [
        'FSS.view.desktop.tabpanel.header.actions.ActionsController',
        'FSS.view.desktop.tabpanel.header.actions.ActionsModel',
        'FSS.view.desktop.tabpanel.header.actions.item.Item'
    ],

    xtype: 'fssHeaderActions',

    cls: 'fssHeaderActionsBar',

    controller: 'fssHeaderActionsController',

    config: {
        userAction: {}
    },

    viewModel: {
        type: 'fssHeaderActionsModel'
    },

    ui: 'tabbar',

    items: [{
        xtype: 'fssHeaderActionItem',
        iconCls: 'pictos pictos-bell'
    }, {
        xtype: 'fssHeaderActionItem',
        iconCls: 'pictos pictos-chat'
    }, {
        xtype: 'fssHeaderActionItem',
        iconCls: 'pictos pictos-user',
        menu: [{
            bind: {
                text: '{locale#languages}'
            },
            menu: [{
                bind: {
                    text: '{locale#en}'
                }
            }, {
                bind: {
                    text: '{locale#sr}'
                }
            }]
        }]
    }]
});