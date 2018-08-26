/**
 * Browser mobile tree-list controller
 * Tree-list data-view contains three sub-lists loaded via routes
 */
Ext.define('FSS.view.mobile.tabpanel.browser.treelist.treelist.TreeListController', {
    extend: 'FSS.view.desktop.tabpanel.browser.treelist.TreeListController',
    alias: 'controller.fssMobileTreeListController',
    
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
    
    onMenuBackAction: function(){
        var available = this.getAvailableLists();
        var view = this.getView();
        var list = view.getActiveItem();
        var index = available.indexOf(list.reference);
        var previousIndex = --index;
        var reference = available[previousIndex];
        if(reference){
            list = view.lookup(reference);
            view.setActiveItem(list);
        }
        else {
            // hide back button
        }
    },
    
    onExpandList: function(expand, reference){
        var listView = this.findList(reference);
        if (expand) {
            this.setActiveItem(listView);
        }
        
        var menus = Ext.Viewport.getMenus();
        var left = menus.left;
        if (left && left.isVisible() && this.getActiveLeague() && !this.getNextLeague(this.getActiveLeague())) {
            //left.hide();
        }
        
        if (!expand) {
            // remove selection for collapsed lists
            var selectable = listView.getSelectable();
            if (selectable) {
                selectable.deselectAll(true);
            }
        }
    },
    
    expandSubLists: function(leagueList, leagueController){
        var availableLists = this.getAvailableLists();
        var leagueIndex = availableLists.indexOf(leagueList.reference);
        if (leagueIndex !== -1) { // collapse sub lists also
            var nextLeagueReference = availableLists[leagueIndex + 1];
            if (nextLeagueReference) {
                this.setActiveItem(leagueList);
            }
        }
    },
    
    setActiveLeagues: function(leagues){
        this.callParent(arguments);
        
        var menus = Ext.Viewport.getMenus();
        var left = menus.left;
        if (left && !left.isVisible()) {
            left.show();
        }
    },
    
    setActiveItem: function(item){
        var view = this.getView();
        
        var active = view.getActiveItem();
        if (active !== item) {
            view.setActiveItem(item);
        }
    }
});