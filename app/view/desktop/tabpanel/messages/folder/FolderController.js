/**
 * FSS.view.desktop.tabpanel.messages.folder.FolderController
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.view.desktop.tabpanel.messages.folder.FolderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssMessagesFolderController',
    
    /**
     * Called when the view is created
     */
    init: function(){
        var folderItems = [{
            name: 'INBOX',
            total: 153
        }, {
            name: 'SENT',
            total: 542
        }, {
            name: 'DRAFT',
            total: 3
        }, {
            name: 'DELETED'
        }];
        
        this.getViewModel().getStore('list').add(folderItems);
    }
});