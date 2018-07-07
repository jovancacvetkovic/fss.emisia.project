Ext.define('FSS.view.desktop.tabpanel.browser.BrowserController', {
    extend: 'FSS.view.desktop.tabpanel.tab.TabController',
    alias: 'controller.fssBrowserController',

    mixins: {
        prepare: 'FSS.mixin.Prepare'
    },

    /**
     * Called when the view is created
     */
    init: function () {
        this.callParent(arguments);
    },

    onActiveRoute: function (args) {
        if (args) {
            var league = args[1];
            var subLeague = args[2];
            var team = args[3];

            var leagueListView = this.lookup('leagueTreeList');
            leagueListView.getController().setActiveLeagues([team, subLeague, league]);
            leagueListView.getController().setOriginalLeagues([league, subLeague, team]);
        }
    },

    /**
     * Set scroller layout
     */
    setScrollerLayout: function () {
        var fssDetails = this.lookup('fssDetails');

        //noinspection JSUnresolvedFunction
        this.lookup('scroller').getController().register({
            scrollEl: Ext.getBody(),
            syncList: [fssDetails]
        });
    }
}, function(Cls){
    Cls.mocks = {
        onActiveRoute: {
            args: {
                0: 'FSS.type.RouteArguments'
            }
        },
        setScrollerLayout: {}
    };
});