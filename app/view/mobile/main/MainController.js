/**
 * Mobile main controller
 */
Ext.define('FSS.view.mobile.main.MainController', {
    extend: 'FSS.view.desktop.main.MainController',
    alias: 'controller.fssMobileMainController',

    requires: [
        'FSS.view.desktop.tabpanel.browser.treelist.TreeList'
    ],

    init: function () {
        Ext.Viewport.setMenu(this.getMenuCfg('left'), {
            side: 'left',
            reveal: true
        });
    },

    getMenuCfg: function (side) {
        return {
            cls: 'fssSideMenu',
            scrollable: 'y',
            items: [{
                xtype: 'fssTreeList',
                reference: 'leagueTreeList',
                minWidth: 220
            }]
        };
    },

    doDestroy: function () {
        Ext.Viewport.removeMenu('left');
        this.callParent();
    }
});