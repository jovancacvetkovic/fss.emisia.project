/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.treelist.TreeList', {
    extend: 'Ext.Panel',
    
    requires: [
        'Ext.Panel',
        'Ext.layout.HBox',
        'FSS.view.desktop.basic.treelist.TreeListController',
        'FSS.view.desktop.basic.treelist.TreeListModel',
        'FSS.view.desktop.basic.treelist.list.CollapsiblePanel',
        'FSS.view.desktop.basic.treelist.list.List'
    ],
    
    xtype: 'fssTreeList',
    
    viewModel: {
        type: 'fssTreeListModel'
    },
    
    cls: 'fssTreeList',
    
    controller: 'fssTreeListController',
    
    layout:{
        type: 'hbox',
        align: 'stretch'
    },
    
    items: [{
        xtype: 'fssList',
        reference: 'mainList',
        cls: 'fssListUiBase'
    }, {
        xtype: 'fssCollapsiblePanel',
        reference: 'subListPanel',
        header: false,
        items: [{
            xtype: 'fssList',
            reference: 'subList',
            cls: 'fssListUiReverted'
        }]
    }, {
        xtype: 'fssCollapsiblePanel',
        reference: 'detailsListPanel',
        header: false,
        items: [{
            xtype: 'fssList',
            reference: 'detailsList',
            cls: 'fssListUiReverted fssListUiLast'
        }],
        collapsible:{
            direction: 'left',
            dynamic: true,
            collapsed: true
        }
    }]
});