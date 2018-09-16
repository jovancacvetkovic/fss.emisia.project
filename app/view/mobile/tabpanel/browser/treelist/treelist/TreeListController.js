/**
 * Browser mobile tree-list controller
 * Tree-list data-view contains three sub-lists loaded via routes
 */
Ext.define('FSS.view.mobile.tabpanel.browser.treelist.treelist.TreeListController', {
    extend: 'FSS.view.desktop.tabpanel.browser.treelist.TreeListController',
    alias: 'controller.fssMobileTreeListController',
    
    listen: {
        controller: {
            // fssTreeListController: {
            //     expandList: 'onExpandList'
            // },
            //
            fssBrowserListController: {
                expandList: 'onExpandList'
            },
            
            fssMobileMainMenuController: {
                menuBackAction: 'onMenuBackAction'
            }
        }
    },
    
    onMenuBackAction: function(){
        var available = this.getAvailableLists();
        var view = this.getView();
        var list = view.getActiveItem();
        var index = available.indexOf(list.reference);
        var previousIndex = --index;
        var reference = available[previousIndex];
        if (reference) {
            list = view.lookup(reference);
            view.setActiveItem(list);
            this.setActiveLeague(this.getSelectedId(list));
        }
        else {
            // TODO hide back button
        }
    },
    
    onExpandList: function(expand, reference){
        var listView = this.findList(reference);
        if (listView) {
            if (expand) {
                this.setActiveItem(listView);
            }
            
            var menus = Ext.Viewport.getMenus();
            var left = menus.left;
            if (left && left.isVisible() && this.getActiveLeague() && !this.getNextLeague(this.getActiveLeague())) {
                //left.hide();
            }
        }
    },
    
    setActiveItem: function(item){
        var view = this.getView();
        view.setActiveItem(item);
    },
    
    expandSubLists: Ext.emptyFn,
    
    setMenuVisible: function(visible){
        var menus = Ext.Viewport.getMenus();
        var left = menus.left;
        if (left) {
            var isVisible = !left.isVisible();
            // left.show();
            if (visible && !isVisible) {
                left.show();
            }
            
            if (!visible && isVisible) {
                left.hide();
            }
        }
    }
});