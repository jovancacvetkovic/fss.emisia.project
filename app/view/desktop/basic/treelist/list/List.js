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
});