/**
 * Created by emisia on 5/17/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.List', {
    extend: 'Ext.dataview.List',
    
    requires: [
        'FSS.view.desktop.tabpanel.browser.treelist.list.ListController',
        'FSS.view.desktop.tabpanel.browser.treelist.list.ListModel'
    ],
    
    xtype: 'fssList',
    
    viewModel: {
        type: 'list'
    },
    
    config: {
        rootId: ''
    },
    
    controller: 'fssBrowserListController',
    
    cls: 'fssTreeListMain',
    
    grouped: true,
    
    groupHeader: {
        tpl: '{name}'
    },
    
    selectable: {
        mode: 'single',
        deselectable: false,
        triggerEvent: 'prevent-childtap',
        triggerCtEvent: 'prevent-tap'
    },
    
    store: {
        grouper: {
            property: 'group',
            direction: 'DESC'
        },
        sorters: [{
            sorterFn: function(record1, record2){
                return record2.data.root;
            },
            direction: 'ASC'
        }]
    },
    
    itemTpl: '{name:htmlEncode}'
});