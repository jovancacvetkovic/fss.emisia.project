/**
 * FSS.view.desktop.tabpanel.messages.folder.FolderModel
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.view.desktop.tabpanel.messages.folder.FolderModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.fssMessagesFolderModel',

    stores: {
        list: {
            model: ''
        }
    }
});