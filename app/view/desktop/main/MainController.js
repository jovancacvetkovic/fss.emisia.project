/**
 * Desktop main controller
 */
Ext.define('FSS.view.desktop.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssDesktopMainController',

    routes: {
        'FSS': 'onRouteNavigate',
        'FSS/:pageId': 'onRouteNavigate',
        'FSS/:pageId/:leagueId': 'onRouteNavigate',
        'FSS/:pageId/:leagueId/:subLeagueId': 'onRouteNavigate',
        'FSS/:pageId/:leagueId/:subLeagueId/:teamId': 'onRouteNavigate'
    },

    control: {
        '#': {
            activeItemChange: 'onTabChange'
        }
    },

    config: {
        defaultPage: 'browser'
    },

    /**
     * Change application route on tab change
     * @param {FSS.view.desktop.main.Main} panel
     * @param {FSS.view.desktop.tabpanel.tab.Tab} tab
     */
    onTabChange: function (panel, tab) {
        this.redirectTo('FSS/' + tab.pageId);
    },

    /**
     * After route is changed collect all data from route and set active tab activeRoute config.
     * Each tab will handle its own route from here
     */
    onRouteNavigate: function () {
        var pageItem = this.lookup(arguments[0]);
        delete arguments[0]; // first route item is not a league but page

        if (!pageItem) { // If none route is set then route to default tab
            var pageId = this.getDefaultPage();
            pageItem = this.lookup(pageId);
        }

        var activeItem = this.getView().getActiveItem();
        if (pageItem) {
            if (activeItem.id !== pageItem.id) {
                // If route should change tab, then set a new active tab from route
                this.getView().setActiveItem(pageItem);
            }

            // Set active tab route arguments
            pageItem.getViewModel().set('activeRoute', arguments);
        }
    }
});