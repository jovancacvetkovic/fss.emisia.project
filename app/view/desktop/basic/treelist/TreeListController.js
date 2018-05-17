/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.treelist.TreeListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssTreeListController',

    
    loadTreeData: function(data, nodeName){
        nodeName = nodeName ? nodeName : 'mainList';
    
        let store = this.lookup(nodeName).getStore(nodeName);
        store.loadRawData(data);
    }
});