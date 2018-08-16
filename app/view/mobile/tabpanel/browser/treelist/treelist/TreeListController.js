/**
 * Browser mobile tree-list controller
 * Tree-list data-view contains three sub-lists loaded via routes
 */
Ext.define('FSS.view.mobile.tabpanel.browser.treelist.treelist.TreeListController', {
    extend: 'FSS.view.desktop.tabpanel.browser.treelist.TreeListController',
    alias: 'controller.fssMobileTreeListController',

    requires: [
        'Ext.util.History'
    ],

    listen: {
        controller: {
            fssTreeListController: {
                expandList: 'onExpandList'
            },

            fssBrowserListController: {
                expandList: 'onExpandList'
            },

            fssMobileMainMenuController: {
                menuBackAction: 'onMenuBackAction'
            }
        }
    },

    onMenuBackAction: function () {
        Ext.History.back()
    },

    onExpandList: function (expand, reference) {
        var listView = this.findList(reference);
        var storeCount = listView.getViewModel().getStore('list').getCount();
        if (storeCount && expand && !this.getNextLeague(this.getActiveLeague())) {
            this.setActiveItem(listView);
        }

        var menus = Ext.Viewport.getMenus();
        var left = menus.left;
        if (left && left.isVisible() && this.getActiveLeague() && !this.getNextLeague(this.getActiveLeague()) && !storeCount) {
            left.hide();
        }

        if (!expand) {
            // remove selection for collapsed lists
            var selectable = listView.getSelectable();
            if (selectable) {
                selectable.deselectAll(true);
            }
        }
    },

    setActiveItem: function (item) {
        var view = this.getView();
        view.setActiveItem(item);
    }
});