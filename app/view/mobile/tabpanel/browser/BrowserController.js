Ext.define('FSS.view.mobile.tabpanel.browser.BrowserController', {
    extend: 'FSS.view.desktop.tabpanel.browser.BrowserController',
    alias: 'controller.fssMobileBrowserController',

    mixins: {
        prepare: 'FSS.mixin.Prepare'
    },

    onActiveRoute: function (args) {
        var leagues = [];
        if (args) {
            for (var arg in args) {
                if (args.hasOwnProperty(arg)) {
                    leagues.push(args[arg]);
                }
            }

            var menus = Ext.Viewport.getMenus();
            var left = menus.left;

            if (left) {
                var leagueListView = left.lookup('leagueTreeList');
                leagueListView.getController().setOriginalLeagues(Ext.clone(leagues));
                leagueListView.getController().setActiveLeagues(Ext.clone(leagues.reverse()));
            }
        }
    },

    setScrollerLayout: Ext.emptyFn
});