/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.treelist.TreeList', {
    extend: 'Ext.Panel',
    
    requires: [
        'Ext.dataview.ItemHeader',
        'Ext.dataview.List',
        'Ext.layout.HBox',
        'FSS.view.desktop.basic.treelist.TreeListController',
        'FSS.view.desktop.basic.treelist.TreeListModel'
    ],
    
    xtype: 'fssTreeList',
    
    viewModel: {
        type: 'fssTreeListModel'
    },
    
    cls: 'fssTreeList',
    
    controller: 'fssTreeListController',
    
    layout: 'hbox',
    
    items: [{
        xtype: 'list',
        reference: 'mainList',
        cls: 'fssTreeListMain',
        
        grouped: true,
        
        groupHeader: {
            tpl: '{name}'
        },
        
        store: {
            grouper: {
                property: 'group'
            },
            sorters: [
                {
                    // Sort by first letter of second word of spirit animal, in
                    // descending order
                    sorterFn: function(record1, record2) {
                        let data = record1.data;
                        return data.root || data.group === 'UNION';
                    },
                    direction: 'ASC'
                }
            ]
        },
        
        itemTpl: '{name}'
    }, {
        xtype: 'list',
        reference: 'subList',
        collapsible: true,
        collapsed: true
    }, {
        xtype: 'list',
        reference: 'detailsList',
        collapsible: true,
        collapsed: true
    }]
});