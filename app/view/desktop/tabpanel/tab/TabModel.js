Ext.define('FSS.view.desktop.tabpanel.tab.TabModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.fssTabModel',

    stores: {
    },

    data: {
        appLocale: {
            title: ''
        },
    
        activeRoute: null
    }
});