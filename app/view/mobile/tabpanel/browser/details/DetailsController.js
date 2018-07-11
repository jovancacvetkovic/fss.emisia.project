/**
 * Browser mobile details controller
 */
Ext.define('FSS.view.mobile.tabpanel.browser.details.DetailsController', {
    extend: 'FSS.view.desktop.tabpanel.browser.details.DetailsController',
    alias: 'controller.fssMobileBrowserDetailsController',

    listen: {
        controller: {
            fssMobileTreeListController: {
                e_loadDetails: 'onLoadDetails'
            }
        }
    }
});