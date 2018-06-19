/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.tabpanel.systematization.SystematizationModel', {
    extend: 'FSS.view.desktop.tabpanel.tab.TabModel',
    alias: 'viewmodel.systematization',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Systematization',
            autoLoad: true
        }
        */
    },

    data: {
        appLocale: {
            title: 'Sistematizacija'
        }
    }
});