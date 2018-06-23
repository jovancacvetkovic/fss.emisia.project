/**
 * FSS Prepare Mixin
 * Prepare data eg mapping, sorting
 */
Ext.define('FSS.mixin.Prepare', {

    /**
     * Prepare list data
     * @param leagues
     * @return {Array}
     */
    prepareLeaguesData: function (leagues) {
        let mappedItems = [];

        for (let key in leagues) {
            if (leagues.hasOwnProperty(key)) {
                let league = leagues[key];
                if (Ext.isObject(league)) {
                    mappedItems.push({
                        root: league['ROOT'],
                        name: league['NAME'],
                        group: league['GROUP'],
                        id: key
                    });
                }
            }
        }

        return mappedItems;
    }
});