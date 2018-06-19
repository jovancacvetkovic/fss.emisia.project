/**
 * Created by emisia on 5/7/18.
 */
Ext.define('FSS.view.desktop.tabpanel.messages.MessagesModel', {
    extend: 'FSS.view.desktop.tabpanel.tab.TabModel',
    alias: 'viewmodel.fssMessagesModel',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'Messages',
            autoLoad: true
        }
        */
    },

    data: {
        appLocale: {
            title: 'Poruke'
        }
    }
});