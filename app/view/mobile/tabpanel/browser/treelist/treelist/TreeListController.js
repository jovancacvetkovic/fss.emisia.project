/**
 * Browser mobile tree-list controller
 * Tree-list data-view contains three sub-lists loaded via routes
 */
Ext.define('FSS.view.mobile.tabpanel.browser.treelist.treelist.TreeListController', {
    extend: 'FSS.view.desktop.tabpanel.browser.treelist.TreeListController',
    alias: 'controller.fssMobileTreeListController',

    /**
     * @inheritDoc
     */
    setActiveLeagues: function (leagues) {
        this.callParent(arguments);

        var menus = Ext.Viewport.getMenus();
        var left = menus.left;
        if (left && left.isVisible()) {
            left.hide();
        }
    }
});