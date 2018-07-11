/**
 * Created by emisia on 6/16/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.collapsible.Collapsible', {
    extend: 'Ext.Panel',
    xtype: 'fssCollapsiblePanel',
    
    requires: [
        'Ext.panel.Collapser', // this is mandatory for collapsible to work
        'FSS.view.desktop.tabpanel.browser.treelist.list.collapsible.CollapsibleController'
    ],
    
    controller: 'fssCollapsibleController',
    
    header: false,
    
    collapsible: {
        direction: 'left',
        dynamic: true,
        collapsed: true
    }
});