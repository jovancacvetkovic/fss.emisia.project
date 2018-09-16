/**
 * FSS Browser List
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.List', {
    extend: 'Ext.dataview.List',
    
    requires: [
        'FSS.view.desktop.tabpanel.browser.treelist.list.ListController',
        'FSS.view.desktop.tabpanel.browser.treelist.list.ListModel',
        'FSS.view.desktop.tabpanel.browser.treelist.list.header.Header'
    ],
    
    xtype: 'fssList',
    
    viewModel: {
        type: 'fssBrowserListModel'
    },
    
    config: {
        selectedId: '',
        selectFirstListItem: false
    },
    
    controller: 'fssBrowserListController',
    
    baseCls: 'fssList',
    
    grouped: true,
    
    groupHeader: {
        xtype: 'fssListHeader'
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
        sorters: {
            property: 'name',
            direction: 'ASC'
        }
    },
    
    itemTpl: '{name:htmlEncode}',
    
    setSelectedId: function(id){
        this._selectedId = id;
    },
    
    onItemDeselect: function(records, suppressEvent){
        // noinspection JSAccessibilityCheck
        this.callParent(arguments);
        
        var record = records[0];
        var findBy = Ext.Function.bind(this.getItemByRecord, this, [record], 1);
        // noinspection JSUnresolvedVariable
        var item = this.items.findBy(findBy);
        if (item && item.removeCls) {
            item.removeCls(record.get('group'));
        }
    },
    
    onItemSelect: function(record, suppressEvent){
        // noinspection JSAccessibilityCheck
        this.callParent(arguments);
        
        var findBy = Ext.Function.bind(this.getItemByRecord, this, [record], 1);
        // noinspection JSUnresolvedVariable
        var item = this.items.findBy(findBy);
        if (item && item.removeCls) {
            item.addCls(record.get('group'));
        }
    },
    
    getItemByRecord: function(item, record){
        var itemRecord = item._record;
        return !!(itemRecord && itemRecord.get('id') === record.get('id'));
    }
}, function(Cls){
    Cls.mocks = {
        getStore: {
            returns: 'Ext.data.Store'
        },
        onItemDeselect: {
            args: {
                0: 'Ext.data.Model[]',
                1: 'boolean'
            }
        },
        onItemSelect: {
            args: {
                0: 'Ext.data.Model[]',
                1: 'boolean'
            }
        },
        getItemByRecord: {
            args: {
                0: 'HTMLElement',
                1: 'Ext.data.Model'
            },
            returns: 'boolean'
        }
    }
});