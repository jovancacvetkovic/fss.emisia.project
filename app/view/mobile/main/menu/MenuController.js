/**
 * Created by emisia on 7/26/18.
 */
Ext.define('FSS.view.mobile.main.menu.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssMobileMainMenuController',

    goBackHandler: function () {
        this.fireEvent('menuBackAction');
    }
});