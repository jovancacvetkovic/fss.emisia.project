/**
 * FSS Prepare Mixin
 * Prepare data eg mapping, sorting
 */
Ext.define('FSS.mixin.Prepare', {

    /**
     * Prepare list data
     * @param {FSS.type.mixin.Prepare[]} leagues
     * @return {FSS.type.mixin.Prepared[]}
     */
    prepareLeaguesData: function (leagues) {
        var mappedItems = [];

        for (var key in leagues) {
            if (leagues.hasOwnProperty(key)) {
                var league = leagues[key];
                if (Ext.isObject(league)) {
                    mappedItems.push({
                        root: league.ROOT,
                        name: league.NAME,
                        group: league.GROUP,
                        id: key
                    });
                }
            }
        }

        return mappedItems;
    }
}, function(Cls){
    Cls.mocks = {
        prepareLeaguesData: {
            args: {
                0: 'FSS.type.mixin.Prepare[]'
            },
            returns: 'FSS.type.mixin.Prepared[]'
        }
    };
});