/**
 * FSS.view.desktop.tabpanel.messages.folder.Folder
 * @author Jovan Cvetkovic
 */
Ext.define('FSS.view.desktop.tabpanel.messages.folder.Folder', {
    extend: 'Ext.dataview.List',
    xtype: 'fssMessagesFolder',
    
    requires: [
        'FSS.view.desktop.tabpanel.messages.folder.FolderController',
        'FSS.view.desktop.tabpanel.messages.folder.FolderModel'
    ],
    
    bind: {
        store: '{list}'
    },
    
    config: {
        selectedId: '',
        selectFirstListItem: false
    },
    
    controller: 'fssMessagesFolderController',
    
    baseCls: 'fss-messages-folder',
    
    grouped: true,
    
    selectable: {
        mode: 'single',
        deselectable: false,
        triggerEvent: 'prevent-childtap',
        triggerCtEvent: 'prevent-tap'
    },
    
    itemTpl: [
        //@formatter:off
        '<div class="fss-messages-folder-item fss-messages-folder-{name}">',
            '<span>{folder}</span>',
            '<span>{total}</span>',
        '</div>'
        //@formatter:on
    ],
    
    viewModel: {
        type: 'fssMessagesFolderModel'
    }
});