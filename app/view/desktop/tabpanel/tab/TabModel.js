/**
 * FSS desktop view tab model
 */
Ext.define('FSS.view.desktop.tabpanel.tab.TabModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.fssTabModel',

    stores: {
    },

    locale: {
        title: ''
    },

    data: {
        activeRoute: null
    }
});