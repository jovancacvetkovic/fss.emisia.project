/**
 * FSS localization util
 * FSS localization store wrapper
 *
 * NOTE: testing other languages then EN, you should set FSS.isDev to `false` in index.html file
 */
Ext.define('FSS.util.Localization', {
    singleton: true,

    constructor: function () {
        this.callParent(arguments);
        FSS.LocaleStore = Ext.create('FSS.store.Localization', {});
    },

    loadLocales: function (url) {
        if (url) {
            FSS.LocaleStore.proxy.setUrl(url);
            FSS.LocaleStore.load();
        }
    },

    getLocaleUrl: function () {
        return FSS.LocaleStore.getLocaleUrl();
    }
}, function () {
    FSS.Locale = FSS.util.Localization;
});