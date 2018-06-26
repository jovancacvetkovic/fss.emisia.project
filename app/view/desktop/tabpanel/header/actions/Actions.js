/**
 * Created by emisia on 5/8/18.
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

    viewModel: {
        type: 'fssHeaderActionsModel'
    },

    controller: 'fssHeaderActionsController',

    config: {
        userAction: {}
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
            text: 'Languages',
            menu: [{
                bind: {
                    text: '{appLocale.enLocale}'
                }
            }, {
                bind: {
                    text: '{appLocale.srLocale}'
                }
            }]
        }]
    }]
});