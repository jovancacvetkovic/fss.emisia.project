/**
 * Created by emisia on 7/8/18.
 */
Ext.define('FSS.view.mobile.tabpanel.header.actions.ActionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssMobileHeaderActionsController',

    openSideMenu: function () {
        var menus = Ext.Viewport.getMenus();
        var left = menus.left;
        if (left && !left.isVisible()) {
            left.show();
        }
    }
});