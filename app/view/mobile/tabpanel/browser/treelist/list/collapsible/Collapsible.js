/**
 * Created by emisia on 6/16/18.
 */
Ext.define('FSS.view.mobile.tabpanel.browser.treelist.list.collapsible.Collapsible', {
    extend: 'FSS.view.desktop.tabpanel.browser.treelist.list.collapsible.Collapsible',
    xtype: 'fssMobileCollapsiblePanel',
    
    requires: [
        'FSS.view.mobile.tabpanel.browser.treelist.list.collapsible.CollapsibleController'
    ],

    controller: 'fssMobileCollapsibleController'
});