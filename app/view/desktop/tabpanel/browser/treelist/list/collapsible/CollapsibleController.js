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
            var isVisible = view.isVisible(true);
            var activeOperation = view.getCollapsible().activeOperation;
            var collapsed = activeOperation ? activeOperation.collapsed : view.getCollapsed();
            if (isVisible) {
                if (expand) {
                    if (collapsed) {
                        view.expand();
                    }
                    
                    this.setViewportMasked(false);
                }
                
                if (!expand && !collapsed) {
                    view.collapse();
                    
                    // remove selection for collapsed lists
                    var selectable = listView.getSelectable();
                    if (selectable) {
                        selectable.deselectAll(true);
                    }
                }
            }
        }
    }
});