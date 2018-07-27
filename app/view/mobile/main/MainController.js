/**
 * Mobile main controller
 */
Ext.define('FSS.view.mobile.main.MainController', {
    extend: 'FSS.view.desktop.main.MainController',
    alias: 'controller.fssMobileMainController',

    requires: [
        'FSS.view.mobile.main.menu.Menu'
    ],

    init: function () {
        Ext.Viewport.setMenu(this.getMenuCfg('left'), {
            side: 'left'
        });
    },

    getMenuCfg: function (side) {
        return {
            xtype: 'fssMobileMainMenu'
        };
    },

    doDestroy: function () {
        Ext.Viewport.removeMenu('left');
        this.callParent();
    }
});