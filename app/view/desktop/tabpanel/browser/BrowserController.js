Ext.define('FSS.view.desktop.tabpanel.browser.BrowserController', {
    extend: 'FSS.view.desktop.tabpanel.tab.TabController',
    alias: 'controller.fssBrowserController',
    
    mixins: {
        prepare: 'FSS.mixin.Prepare'
    },
    
    /**
     * Called when the view is created
     */
    init: function(){
        this.callParent(arguments);
    },
    
    onActiveRoute: function(args){
        var leagues = [];
        if (args) {
            for (var arg in args) {
                if (args.hasOwnProperty(arg)) {
                    leagues.push(args[arg]);
                }
            }
            
            var leagueListView = this.lookup('leagueTreeList');
            leagueListView.getController().setOriginalLeagues(Ext.clone(leagues));
            leagueListView.getController().setActiveLeagues(Ext.clone(leagues.reverse()));
        }
    },
    
    /**
     * Set scroller layout
     */
    setScrollerLayout: function(){
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
                0: 'FSS.type.RouteArguments|undefined'
            }
        },
        setScrollerLayout: {}
    };
});