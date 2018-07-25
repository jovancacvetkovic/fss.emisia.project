/**
 * Created by emisia on 6/16/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.collapsible.CollapsibleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssCollapsibleController',
    
    listen: {
        controller: {
            fssTreeListController: {
                expandList: 'onExpandList'
            },

            fssBrowserListController: {
                expandList: 'onExpandList'
            }
        }
    },
    
    onExpandList: function(expand, reference){
        var view = this.getView();
        var listView = view.items.getAt(0);
        if (view.rendered && listView.reference === reference || reference === null) {
            if (expand && view.getCollapsed()){
                view.expand();
            }
            if (!expand && !view.getCollapsed()){
                view.collapse();

                // remove selection for collapsed lists
                var selectable = listView.getSelectable();
                if(selectable){
                    selectable.deselectAll(true);
                }
            }
        }
    }
});