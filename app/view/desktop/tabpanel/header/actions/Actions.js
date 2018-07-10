/**
 * FSS Desktop TabPanel Header Actions View
 */
Ext.define('FSS.view.desktop.tabpanel.header.actions.Actions', {
    extend: 'Ext.Toolbar',

    requires: [
        'FSS.view.desktop.tabpanel.header.actions.ActionsModel',
        'FSS.view.desktop.tabpanel.header.actions.item.Item'
    ],

    xtype: 'fssHeaderActions',

    cls: 'fssHeaderActionsBar',

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
            menu: {
                defaults: {
                    handler: 'onLocaleTriggered'
                },
                items: [{
                    bind: {
                        text: '{locale#en}'
                    },
                    itemId: 'en'
                }, {
                    bind: {
                        text: '{locale#sr}'
                    },
                    itemId: 'sr'
                }]
            }
        }]
    }]
});