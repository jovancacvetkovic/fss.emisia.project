/**
 * Created by emisia on 5/17/18.
 */
Ext.define('FSS.view.desktop.basic.treelist.list.List', {
    extend: 'Ext.dataview.List',
    
    requires: [
        'FSS.view.desktop.basic.treelist.list.ListModel',
        'FSS.view.desktop.basic.treelist.list.ListController'
    ],
    
    xtype: 'fssList',
    
    viewModel: {
        type: 'list'
    },
    
    config: {
        rootId: ''
    },
    
    controller: 'list',
    
    cls: 'fssTreeListMain',
    
    grouped: true,
    
    groupHeader: {
        tpl: '{name}'
    },
    
    selectable: {
        mode: 'single',
        deselectable: false
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