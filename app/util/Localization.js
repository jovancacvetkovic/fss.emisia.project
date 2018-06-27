Ext.define('FSS.util.Localization', {
    singleton: true,

    constructor: function () {
        this.callParent(arguments);
        FSS.LocaleStore = Ext.create('FSS.store.Localization', {});
    },

    loadLocales: function (url) {
        FSS.LocaleStore.proxy.setUrl(url);
        FSS.LocaleStore.load();
    },

    getLocaleUrl: function () {
        return FSS.LocaleStore.getLocaleUrl();
    }
}, function () {
    FSS.Locale = FSS.util.Localization;
});