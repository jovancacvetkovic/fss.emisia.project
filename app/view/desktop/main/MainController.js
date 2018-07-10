/**
 * Desktop main controller
 */
Ext.define('FSS.view.desktop.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fssDesktopMainController',

    routes: {
        'FSS': 'onRouteNavigate',
        'FSS/': 'onRouteNavigate',
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

    onTabChange: function (panel, tab) {
        this.redirectTo('FSS/' + tab.pageId);
    },

    onRouteNavigate: function () {
        var pageItem = this.lookup(arguments[0]);
        var pageId = arguments[1];

        if (!pageItem) {
            pageId = this.getDefaultPage();
            pageItem = this.lookup(pageId);
        }

        var activeItem = this.getView().getActiveItem();
        if (pageItem) {
            if (activeItem.id !== pageItem.id) {
                this.getView().setActiveItem(pageItem);
            }

            pageItem.getViewModel().set('activeRoute', arguments);
        }
    }
});