/**
 * Created by emisia on 5/19/18.
 */
Ext.define('FSS.mixin.Prepare', {
    prepareLeaguesData: function(leagues){
        var mappedItems = [];
        
        for (var key in leagues){
            if (leagues.hasOwnProperty(key)){
                let league = leagues[key];
                mappedItems.push({
                    root: league['ROOT'],
                    name: league['NAME'],
                    group: league['GROUP'],
                    id: key
                });
            }
        }
        
        return mappedItems;
    }
});