/**
 * Created by emisia on 6/16/18.
 */
Ext.define('FSS.view.mobile.tabpanel.browser.treelist.list.collapsible.CollapsibleController', {
    extend: 'FSS.view.desktop.tabpanel.browser.treelist.list.collapsible.CollapsibleController',
    alias: 'controller.fssMobileCollapsibleController',
    
    listen: {
        controller: {
            fssMobileTreeListController: {
                expandList: 'onExpandList'
            },

            fssMobileBrowserListController: {
                expandList: 'onExpandList'
            }
        }
    }
});