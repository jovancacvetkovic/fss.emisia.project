/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.browser.BrowserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.browserModel',
    
    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Browser',
            autoLoad: true
        }
        */
    },
    
    data: {
        appLocale: {
            title: 'Pretraživač'
        }
    }
});