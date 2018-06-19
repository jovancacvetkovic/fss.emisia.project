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
            }
        }
    },
    
    onExpandList: function(expand, reference){
        let view = this.getView();
        if (view.items.getAt(0).reference === reference) {
            if (expand && view.getCollapsed()){
                view.expand();
            }
            if (!expand && !view.getCollapsed()){
                view.collapse();
            }
        }
    }
});