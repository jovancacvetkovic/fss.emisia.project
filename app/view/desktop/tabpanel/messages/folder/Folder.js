/**
 * FSS.view.desktop.tabpanel.messages.folder.Folder
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.view.desktop.tabpanel.messages.folder.Folder', {
    extend: 'Ext.dataview.List',
    
    requires: [
        'FSS.view.desktop.tabpanel.messages.folder.FolderController',
        'FSS.view.desktop.tabpanel.messages.folder.FolderModel'
    ],
    
    xtype: 'fssMessagesFolder',
    
    viewModel: {
        type: 'fssMessagesFolderModel'
    },
    
    config: {
        selectedId: '',
        selectFirstListItem: false
    },
    
    controller: 'fssMessagesFolderController',
    
    baseCls: 'fssMessagesFolder',
    
    grouped: true,
    
    selectable: {
        mode: 'single',
        deselectable: false,
        triggerEvent: 'prevent-childtap',
        triggerCtEvent: 'prevent-tap'
    },
    
    itemTpl: '{name:htmlEncode}'
});