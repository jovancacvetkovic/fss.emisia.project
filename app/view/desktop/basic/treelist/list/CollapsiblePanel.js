/**
 * Created by emisia on 5/19/18.
 */
Ext.define('FSS.view.desktop.basic.treelist.list.CollapsiblePanel', {
    extend: 'Ext.Panel',

    xtype: 'fssCollapsiblePanel',
    
    collapsible:{
        direction: 'left',
        dynamic: true,
        collapsed: true
    }
});