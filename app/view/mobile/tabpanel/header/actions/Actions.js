/**
 * FSS Mobile TabPanel Header Actions View
 */
Ext.define('FSS.view.mobile.tabpanel.header.actions.Actions', {
    extend: 'FSS.view.desktop.tabpanel.header.actions.Actions',

    requires: [
        'FSS.view.mobile.tabpanel.header.actions.ActionsController'
    ],

    xtype: 'fssMobileHeaderActions',

    controller: 'fssMobileHeaderActionsController',

    items: [{
        xtype: 'fssHeaderActionItem',
        iconCls: 'pictos pictos-list',
        handler: 'openSideMenu'
    }, {
        xtype: 'spacer'
    }, {
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