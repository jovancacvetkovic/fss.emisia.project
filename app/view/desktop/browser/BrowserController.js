/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.browser.BrowserController', {
    extend: 'FSS.view.desktop.basic.BasicController',
    alias: 'controller.browserController',
    
    mixins: {
        prepare: 'FSS.mixin.Prepare'
    },
    
    /**
     * Called when the view is created
     */
    init: function(){
        this.callParent(arguments);
        
        var leagues = FSS.firebase.database().ref('LEAGUE');
        leagues.once('value').then(this.loadLeagueList.bind(this));
    },
    
    loadLeagueList: function(snapshot){
        var leagues = snapshot.val();
        
        leagues = this.mixins.prepare.prepareLeaguesData(leagues);
        this.lookup('leagueList').getController().loadTreeData(leagues, 'mainList');
    }
});