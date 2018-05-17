/**
 * Created by emisia on 5/13/18.
 */
Ext.define('FSS.view.desktop.basic.BasicController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.basicController',
    
    /**
     * Called when the view is created
     */
    init: function(){
        var leagues = FSS.firebase.database().ref('LEAGUE');
        FSS.firebase.database().ref('LEAGUE').once('value').then(this.loadLeagueList.bind(this));
    },
    
    loadLeagueList: function(snapshot){
        var leagues = snapshot.val();
        leagues = this.prepareLeaguesData(leagues);
        this.lookup('leagueList').getController().loadTreeData(leagues, 'mainList');
    },
    
    prepareLeaguesData: function(leagues){
        var mappedItems = [];
        
        for (var key in leagues){
            if (leagues.hasOwnProperty(key)){
                let league = leagues[key];
                mappedItems.push({
                    root: league['ROOT'],
                    name: league['NAME'],
                    group: league['GROUP']
                });
            }
        }
        
        return mappedItems;
    }
});