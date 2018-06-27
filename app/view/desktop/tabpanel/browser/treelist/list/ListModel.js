/**
 * Created by emisia on 5/17/18.
 */
Ext.define('FSS.view.desktop.tabpanel.browser.treelist.list.ListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.list',

    stores: {
        list: {
            grouper: {
                property: 'group',
                direction: 'DESC'
            },
            sorters: {
                property: 'name',
                direction: 'ASC'
            }
        }
    },

    data: {
        locale: {
            UNION: 'Savezi',
            LEAGUE: 'Lige'
        }
    }
});