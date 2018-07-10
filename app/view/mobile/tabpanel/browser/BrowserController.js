Ext.define('FSS.view.mobile.tabpanel.browser.BrowserController', {
    extend: 'FSS.view.desktop.tabpanel.browser.BrowserController',
    alias: 'controller.fssMobileBrowserController',

    mixins: {
        prepare: 'FSS.mixin.Prepare'
    },

    onActiveRoute: function (args) {
        if (args) {
            var league = args[1];
            var subLeague = args[2];
            var team = args[3];

            var menus = Ext.Viewport.getMenus();
            var left = menus.left;

            if (left) {
                var leagueListView = left.items.getAt(0);
                leagueListView.getController().setActiveLeagues([team, subLeague, league]);
                leagueListView.getController().setOriginalLeagues([league, subLeague, team]);
            }
        }
    },

    setScrollerLayout: Ext.emptyFn
});