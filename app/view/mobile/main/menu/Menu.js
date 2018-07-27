// noinspection JSValidateTypes
/**
 * Created by emisia on 7/26/18.
 */
Ext.define('FSS.view.mobile.main.menu.Menu', {
    extend: 'Ext.ActionSheet',
    xtype: 'fssMobileMainMenu',

    requires: [
        'FSS.view.mobile.main.menu.MenuController',
        'FSS.view.mobile.tabpanel.browser.treelist.treelist.TreeList'
    ],

    config: {
        side: 'left'
    },

    cls: 'fssSideMenu',

    controller: 'fssMobileMainMenuController',

    scrollable: 'y',

    referenceHolder: true,

    items: [{
        text: 'Back',
        handler: 'goBackHandler'
    }, {
        xtype: 'fssMobileTreeList',
        reference: 'leagueTreeList',
        minWidth: 220,
        height: Ext.getViewportHeight()
    }]
});