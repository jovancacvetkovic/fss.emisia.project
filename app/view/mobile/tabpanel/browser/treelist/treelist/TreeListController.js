/**
 * Browser mobile tree-list controller
 * Tree-list data-view contains three sub-lists loaded via routes
 */
Ext.define('FSS.view.mobile.tabpanel.browser.treelist.treelist.TreeListController', {
    extend: 'FSS.view.desktop.tabpanel.browser.treelist.TreeListController',
    alias: 'controller.fssMobileTreeListController',

    requires: [
        'FSS.view.mobile.main.menu.MenuController'
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
        debugger;
        var previousIndex = this.getOriginalLeagues().indexOf(this.getPreviousLeague());
        if (previousIndex !== -1) {
            previousIndex = previousIndex === (this.getOriginalLeagues().length - 1) ? 0 : previousIndex;
            var previousListReference = this.getAvailableLists()[previousIndex];
            var previousList = this.findList(previousListReference);

            this.setActiveLeague(this.getOriginalLeagues()[previousIndex]);
            this.setPreviousLeague(this.getOriginalLeagues()[--previousIndex]);

            this.setActiveItem(previousList);
        }
    },

    onExpandList: function (expand, reference) {
        var listView = this.findList(reference);
        var storeCount = listView.getViewModel().getStore('list').getCount();
        if (storeCount && expand && !this.getNextLeague(this.getActiveLeague())) {
            this.setActiveItem(listView);
        }
        debugger;
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