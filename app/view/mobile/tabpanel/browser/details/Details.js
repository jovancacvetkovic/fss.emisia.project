/**
 * Mobile browser details panel
 */
Ext.define('FSS.view.mobile.tabpanel.browser.details.Details', {
    extend: 'FSS.view.desktop.tabpanel.browser.details.Details',

    xtype: 'fssMobileDetails',

    requires: [
        'FSS.view.mobile.tabpanel.browser.details.DetailsController'
    ],

    cls: 'fssMobileDetails',

    controller: 'fssMobileBrowserDetailsController',

    listen: {
        controller: {
            fssTreeListController: {
                e_loadDetails: 'onLoadDetails'
            }
        }
    },

    /**
     * Handles list item selection and load selected league list
     * @param {String} leagueId League identification string
     */
    closeSideMenu: function (leagueId) {
        var menus = Ext.Viewport.getMenus();
        var left = menus.left;
        if (left && !left.isVisible()) {
            left.show();
        }
    }
});